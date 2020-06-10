const Joi = require('joi');
//here we let user authenticate either with email or with username
const authenticateUserSchema = Joi.alternatives().try(
    Joi.object({
        username: Joi.string().alphanum().min(2).max(30).required(),
        password: Joi.string().required()
    }),
    Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
);

module.exports  = authenticateUserSchema;