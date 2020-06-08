const Services = require('../models/services');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kajuy', { useNewUrlParser: true , useUnifiedTopology: true });

const services = [
	{
		"category":"Handyman",
		"service":"Electricals",
		"provider_id":"5e989024edf5632b2e9691ec",
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	},
	{
		"category":"Handyman",
		"service":"Plumbing",
		"provider_id":"5e989024edf5632b2e9691ec",
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	},
	{
		"category":"Cleaning",
		"service":"<25 m2",
		"provider_id":"5e989024edf5632b2e9691ec",
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	}
]

function deleteAllServices() {
	return Services.deleteMany({})
		.then(() => {
			console.log('Deleted all offices');
		})
		.catch((err) => {
			console.log('Failed to delete all offices');
			return Promise.reject(err);
		});
}

deleteAllServices();

Services.create(services, (err, services) => {
	if (err) {
		throw (err);
	}
	console.log('Success', services);
	mongoose.connection.close();
});