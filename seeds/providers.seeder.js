const Providers = require('../models/providers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kajuy', { useNewUrlParser: true , useUnifiedTopology: true });


const providers = [
	{
		"avatar":'[photo.png]',
		"username":'lorem ipsum',
		"password":"hashed123545",
		"email":"lorea@abc.com",
		"address_l1":"paseo 56",
		"address_l2":"13-2b",
		"address_city":"barcelona",
		"address_code":"08001",
		"wallet":'[photo.png, photo.png]',
		"paid":0,
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		"ratings":3.5,
		"booking_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"],
		"service_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"]
	},
	{
		"avatar":'[photo.png]',
		"username":'lorem ipsum',
		"password":"hashed123545",
		"email":"lorea@abc.com",
		"address_l1":"paseo 56",
		"address_l2":"13-2b",
		"address_city":"barcelona",
		"address_code":"08001",
		"wallet":'[photo.png, photo.png]',
		"paid":0,
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		"ratings":3.5,
		"booking_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"],
		"service_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"]
	},
	{
		"avatar":'[photo.png]',
		"username":'lorem ipsum',
		"password":"hashed123545",
		"email":"lorea@abc.com",
		"address_l1":"paseo 56",
		"address_l2":"13-2b",
		"address_city":"barcelona",
		"address_code":"08001",
		"wallet":'[photo.png, photo.png]',
		"paid":0,
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		"ratings":3.5,
		"booking_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"],
		"service_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"]
	},
	{
		"avatar":'[photo.png]',
		"username":'lorem ipsum',
		"password":"hashed123545",
		"email":"lorea@abc.com",
		"address_l1":"paseo 56",
		"address_l2":"13-2b",
		"address_city":"barcelona",
		"address_code":"08001",
		"wallet":'[photo.png, photo.png]',
		"paid":0,
		"extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		"ratings":3.5,
		"booking_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"],
		"service_ids":["5e989024edf5632b2e9691ec", "5e989024edf5632b2e9691ec"]
	}
];

function deleteAllProviders() {
	return Providers.deleteMany({})
		.then(() => {
			console.log('Deleted all providers');
		})
		.catch((err) => {
			console.log('Failed to delete all providers');
			return Promise.reject(err);
		});
}

deleteAllProviders();

Providers.create(providers, (err, providers) => {
	if (err) {
		throw (err);
	}
	console.log('Success', providers);
	mongoose.connection.close();
});
