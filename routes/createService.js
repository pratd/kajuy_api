const ServiceSchema = require("../models/services");
const ProviderSchema = require("../models/providers");
const verifyServiceSchema = require("../schemas/verifyService");
module.exports = {
    method: "POST",
    path: "/service/add",
    config: {
        auth: {
            strategy: "jwtokenization",
            scope: ["read: provider"],
        },
        payload: {
        output: "stream",
        parse: true,
        allow: [
            "application/json",
            "multipart/form-data",
            "image/jpeg",
            "application/pdf",
            "application/x-www-form-urlencoded",
        ],
        multipart: true,
        maxBytes: 1024 * 1024 * 100,
        timeout: false,
    },
    handler: async (req, res) => {
        const data = req.payload;
        //* creating a new service
        let services = new ServiceSchema();
        services.category = data.category;
        services.service = data.service;
        services.provider_id = req.auth.credentials.id;
        services.extra = data.extra;
        service.date = data.date;
        //updating the services
        try {
        await services.save();
        let providerServices = await ProviderSchema.findById(
            req.auth.credentials.id
        );
        providerServices = providerServices.service_ids;
        providerServices.push(services.id);
        await ProviderSchema.findByIdAndUpdate(
            { _id: req.auth.credentials.id },
            {
            service_ids: providerServices,
            }
        );
        return res.response("New service saved to database");
        } catch(err) {
        return res.response("There was an error trying to create this service");
        }
    }
    },
    validate: {
        payload: verifyServiceSchema,
        //! show the error returned in the fields for POSTMAN
        failAction: (request, h, err) => {
            return err;
        },
    },
};
