const BookingModel = require('../models/bookings');
const BookingSchema = require('../schemas/verifyBooking').verifyBookingSchema;
const Boom = require('boom');
module.exports ={
    method: "PUT",
    path:'/booking/update/{id}',
    config:{
        handler: async(req, res)=>{
            try{
                //*update the booking DB
                const result = await BookingModel.findByIdAndUpdate(req.params.id,req.payload,{new:true,omitUndefined:true});
                return res.response(result);
            }catch (error){
                return Boom.badRequest('Unexpected Input!');
            }
        },
        // Add authentication to this route
        // The user must have a scope of `admin`
        auth: {
            strategy: 'jwtokenization',
            scope: ['provider']
        },
        payload:{
        output: 'stream',
            parse: true,
            allow: ['application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
            multipart: true,
            maxBytes: 1024 * 1024*100,
            timeout: false,
        },
        validate:{
            payload: BookingSchema,
            failAction: (reques, resp, error)=>{
                return error.isJoi ? resp.response(error.details[0]).takeover() :
                resp.response(error).takeover();
            }
        }
    }
};