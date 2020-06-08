const ServiceModel = require('../models/services');
const ProviderModel = require('../models/providers');
const Boom = require('boom');

module.exports={
    method: "DELETE",
    path:"/service/delete/{id}",
    config: {
        handler: async (req, res)=>{
            try{
                let result = await ServiceModel.findByIdAndUpdate(req.params.id);
                // TODO: delete service ids from providers
                await ProviderModel.findByIdAndUpdate({_id:result.provider_id},{$pull:{service_ids:req.params.id}}, {new : true});
                return res.response(result);
            }catch(error){
                return Boom.badRequest('Unexpected Input!');
            }
        },
        auth: {
            strategy: 'jwtokenization',
            scope: ['read: provider']
        },
        payload:{
            allow: ['application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
            multipart: true,
        }
    }
};