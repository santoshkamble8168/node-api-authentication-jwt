const jwt = require('jsonwebtoken');

//Auth middleware function
 module.exports = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        //if token is not available return 401
        if(!token) return res.status(401).send('Access Denied');

        //if token is available verify it
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verify;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}