const Buyer_request = require('../models/buyer_requests');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kajuy', { useNewUrlParser: true , useUnifiedTopology: true });

const buyer_requests = [{
	"service_id":'5e988e2189280c2746373c7a',
	"provider_id":'5e989024edf5632b2e9691ec',
	"provider_name":"lorem ipsum",
	"provider_email":"lorea@abc.com",
	"provider_phone":"12345679",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"buyer_name":"lorem ipsum",
	"buyer_email":"loread@abc.com",
	},
	{
	"service_id":'5e988e2189280c2746373c7a',
	"provider_id":'5e989024edf5632b2e9691ec',
	"provider_name":"lorem ipsum",
	"provider_email":"lorea@abc.com",
	"provider_phone":"12345679",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"buyer_name":"lorem ipsum",
	"buyer_email":"loread@abc.com",
	},
	{
	"service_id":'5e988e2189280c2746373c7a',
	"provider_id":'5e989024edf5632b2e9691ec',
	"provider_name":"lorem ipsum",
	"provider_email":"lorea@abc.com",
	"provider_phone":"12345679",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"buyer_name":"lorem ipsum",
	"buyer_email":"loread@abc.com",
	},
	{
	"service_id":'5e988e2189280c2746373c7a',
	"provider_id":'5e989024edf5632b2e9691ec',
	"provider_name":"lorem ipsum",
	"provider_email":"lorea@abc.com",
	"provider_phone":"12345679",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"buyer_name":"lorem ipsum",
	"buyer_email":"loread@abc.com",
	}
];

function deleteAllBuyersRequests() {
	return Buyer_request.deleteMany({})
		.then(() => {
			console.log('Deleted all buyer\'s requests');
		})
		.catch((err) => {
			console.log('Failed to deleted all buyer\'s requests');
			return Promise.reject(err);
		});
}

deleteAllBuyersRequests();

Buyer_request.create(buyer_requests, (err, buyer_requests) => {
	if (err) {
		throw (err);
	}
	console.log('Success', buyer_requests);
	mongoose.connection.close();
});