const router = require('express').Router();
const verifyToken = require('./tokenVerification');

router.get('/', verifyToken, (req, res) => {
    res.json({
        posts: {
            title: "First post",
            body: "this is the first post",
            loggedInUser: req.user
        }
    });
})

module.exports = router;