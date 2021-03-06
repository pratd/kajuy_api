const Joi = require('joi');

const verifyServiceSchema = Joi.object({
    "category":Joi.string().optional(),
    "service":Joi.string().optional(),
    "extra":Joi.string().optional(),
    "date":Joi.date().min("now").optional(),
});
module.exports ={
    verifyServiceSchema : verifyServiceSchema
};