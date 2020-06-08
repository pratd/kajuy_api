const ServiceModel = require('../models/services');
const serviceSchema = require('../schemas/verifyService');
const Boom = require('boom');
module.exports ={
    method: "PUT",
    path:'/service/update/{id}',
    config:{
        handler: async(req, res)=>{
            try{
                //*update the services DB
                await ServiceModel.findByIdAndUpdate(req.params.id,req.payload,{new:true,omitUndefined:true});
                return res.response(result);
            }catch (error){
                return Boom.badRequest('Unexpected Input!');
            }
        }
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
        strategy: 'jwtokenization',
        scope: ['read: provider']
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
        payload: serviceSchema,
        failAction: (reques, resp, error)=>{
            return error.isJoi ? resp.response(error.details[0]).takeover() :
            resp.response(error).takeover();
        }
    }
};