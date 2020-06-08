const Buyers = require('../models/buyers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kajuy', { useNewUrlParser: true , useUnifiedTopology: true });

const buyers = [{
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
    "extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
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
    "extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
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
    "extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
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
    "extra":'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	}
];

function deleteAllBuyers() {
	return Buyers.deleteMany({})
		.then(() => {
			console.log('Deleted all buyers');
		})
		.catch((err) => {
			console.log('Failed to deleted all buyers');
			return Promise.reject(err);
		});
}

deleteAllBuyers();

Buyers.create(buyers, (err, buyers) => {
	if (err) {
		throw (err);
	}
	console.log('Success', buyers);
	mongoose.connection.close();
});