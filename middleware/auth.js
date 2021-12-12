const jwt = require('jsonwebtoken');
const config = require('config');





module.exports = function (req, res, next) {
    // Get token from header 

    const token = req.header('Authorization');
    console.log(token);
    trimToken = token.replace("Bearer ", "");
    // Check if not token 
    console.log(trimToken);
    if (!token) {
        return res.status(401).json({ msg: 'Token missing, access denied' });
    }
    try {
        const decoded = jwt.verify(trimToken, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }

};