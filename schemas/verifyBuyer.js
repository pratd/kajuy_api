const Joi = require('joi');

const verifyBuyerSchema = Joi.object({
    "avatar": Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
    "username":Joi.string().alphanum().min(6).max(30).optional(),
    "password":Joi.string().optional(),
    "email":Joi.string().email().optional(),
    "address_l1":Joi.string().optional(),
    "address_l2":Joi.string().optional(),
    "address_city":Joi.string().optional(),
    "address_code":Joi.string().optional(),
    "wallet":Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
    "paid":Joi.boolean().optional(),
    "role":Joi.string().optional()
});
module.exports ={
    verifyBuyerSchema : verifyBuyerSchema
};