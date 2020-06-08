const ProviderSchema = require("../models/providers");

module.exports ={
    method: "GET",
    path: "/providers",
    handler: async (req, res) => {
        try {
            const provider = await ProviderSchema.find().exec();
            return res.response(provider);
        } catch (error) {
            return res.response(error).code(500);
	    }
	}
};