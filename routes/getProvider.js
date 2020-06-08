const ProviderSchema = require("../models/providers");

module.exports ={
    method: "GET",
    path: "/provider/{id}",
    config: {
        auth: {
            strategy: "jwtokenization",
            scope:"read: provider"
        },
        handler: async (req, res) => {
            const providerId = req.params.id;
            try {
                const provider = await ProviderSchema.findById(providerId).exec();
                return res.response(provider);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    }
};