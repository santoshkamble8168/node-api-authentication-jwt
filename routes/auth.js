const router = require('express').Router();
const User = require('../models/User');
const {registervalidation, loginvalidation} = require('../validations/uservalidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        //check validation
        const {error} = registervalidation(req.body);
        if(error) return res.status(400).send(error.details);

        //check user exist
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send({message:"Email already exists"});

        //create hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        
        const saveUser = await user.save();
        res.send({id:user._id,message:"User created"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    //check validation
    const {error} = loginvalidation(req.body);
    if(error) return res.status(400).send(error.details);

    //check email exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({message:"Email not exists!"});

    //check password
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword) return res.status(400).send({error:true, message:"Invalid password"})

    //create a token
    //Token contain Payload and privtate secret key
    const token = jwt.sign({_id:user._id, role:"user"}, process.env.JWT_SECRET_KEY )
    res.header('auth-token', token).send(token);

});

module.exports = router;