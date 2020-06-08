const Buyers = require("../models/buyers");
const VerifyBuyerSchema = require("../schemas/verifyBuyer").verifyBuyerSchema;
const upload = require('./uploadImages');
module.exports ={
    method: "PUT",
    path:'/buyer/update/{id}',
    config:{
        handler: async(req, res)=>{
            //TODO: updating the photo
            const responseFile = async(req, h)=>{
                let responseFile = null;
                if (req.payload.avatar){
                    await upload(req.payload.avatar, req).then((resp)=>{
                        responseFile = {fileUrl: resp.Location};
                    }).catch((err)=>{
                        responseFile = err.message;
                    });
                    return responseFile;
                }
            };

            let filetoPush = await Promise.resolve(responseFile);

            if(filetoPush){
                try{
                    //*update photo first
                    //if the field dont exist
                    console.log('--------This file is pushed:  ',filetoPush);
                    await Buyers.findByIdAndUpdate({_id:req.params.id},
                        {avatar: filetoPush} ,{new:true});
                    if (req.payload.avatar){
                        req.payload.avatar=undefined;
                    }
                    //*final update after pushing the photo
                    await Buyers.findByIdAndUpdate(req.params.id,req.payload,{new:true,omitUndefined:true});
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
            scope: ['read: buyer']
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
            payload: VerifyBuyerSchema,
            failAction: (reques, resp, error)=>{
                return error.isJoi ? resp.response(error.details[0]).takeover() :
                resp.response(error).takeover();
            }
        }
    }
};