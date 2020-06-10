const Joi = require('joi');

const verifyBookingSchema = Joi.object({
    "category":Joi.string().optional(),
    "service":Joi.string().optional(),
    "payment":Joi.number().optional(),
    "date":Joi.date().min("now").optional(),
    "confirmed":Joi.boolean().optional(),
    "paid":Joi.boolean().optional()
});
module.exports ={
    verifyBookingSchema : verifyBookingSchema
};
