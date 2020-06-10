const BookingModel = require('../models/bookings');
const ProviderModel = require('../models/providers');
const BuyerModel = require('../models/buyers');
const Boom = require('boom');

module.exports={
    method: "DELETE",
    path:"/booking/delete/{id}",
    config: {
        handler: async (req, res)=>{
            try{
                let result = await BookingModel.findByIdAndUpdate(req.params.id);
                // TODO: delete service ids from providers
                await ProviderModel.findByIdAndUpdate({_id:result.provider_id},{$pull:{booking_ids:req.params.id}}, {new : true});
                await BuyerModel.findByIdAndUpdate({_id:result.pbuyer_id},{$pull:{booking_ids:req.params.id}}, {new : true});
                return res.response(result);
            }catch(error){
                return Boom.badRequest('Unexpected Input!');
            }
        },
        auth: {
            strategy: 'jwtokenization',
            scope: ['provider']
        },
        payload:{
            allow: ['application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
            multipart: true,
        },
    }
};