const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
    [check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Email must be valid')
        .isEmail(),
    check('password', 'Password must contain 8 or more characters'
    ).isLength({ min: 8 }),

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            user = new User({
                name, email, password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        };

    }
);

module.exports = router;