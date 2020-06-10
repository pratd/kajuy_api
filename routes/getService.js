const ServiceSchema = require("../models/services");
module.exports = {
	method: "GET",
	path: "/service/{id}",
	config:{
		handler: async (req, res) => {
			const serviceId = req.params.id;
			try {
				const service = await ServiceSchema.findById(serviceId).exec()
				return res.response(service);
			} catch (error) {
				return res.response(error).code(500);
			}
		}
	}
};