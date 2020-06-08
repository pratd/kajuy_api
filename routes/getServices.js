const ServiceSchema = require("../models/services");
module.exports = {
	method: "GET",
	path: "/services",
	handler: async (req, res) => {
		const pageOptions = {
			page: null,
			limit: null
		};

		let sorting = '-updated_at';

		pageOptions.page = req.query.page ? parseInt(req.query.page, 10) :  pageOptions.page;
		pageOptions.limit = req.query.limit ? parseInt(req.query.limit, 10) : pageOptions.page;

		sorting = req.query.sort ? 'updated_at' : sorting;


		let findQuery = [];
		req.query.category ? findQuery.push({category: req.query.category}): findQuery = findQuery;
		req.query.service ? findQuery.push({service: req.query.service}): findQuery = findQuery;

		if(findQuery.length > 0){
			try {
				const services = await ServiceSchema.find({
					$and: findQuery
				}).skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).sort(sorting)
				return res.response(services);
			} catch (error) {
				return res.response(error).code(500);
			}
		}else{
			try {
				const services = await ServiceSchema.find().skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit).sort(sorting)
				return res.response(services);
			} catch (error) {
				return res.response(error).code(500);
			}
		}
	}
};