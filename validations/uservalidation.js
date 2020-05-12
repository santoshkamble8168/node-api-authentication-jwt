//Validation
const Joi = require('@hapi/joi');

//Register validation
const registervalidation = req_body => {
    const userSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return userSchema.validate(req_body);
}

//Login validation
const loginvalidation = req_body => {
    const userSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return userSchema.validate(req_body);
}

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;