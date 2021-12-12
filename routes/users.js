const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');

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
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        res.send('passed');
    }
);

module.exports = router;