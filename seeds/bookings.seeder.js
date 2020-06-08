const Bookings = require('../models/bookings');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kajuy', { useNewUrlParser: true , useUnifiedTopology: true });

const bookings = [
    {
        "category":'Handyman',
        "service":'Electricals',
        "payment":35,
        "confirmed":0,
        "buyer_id":'5e989024edf5632b2e9691ec',
        "service_id":'5e988e2189280c2746373c7a',
        "provider_id":'5e989024edf5632b2e9691ec',
        "paid":0,
    },
	{
        "category":'Handyman',
        "service":'Electricals',
        "payment":35,
        "confirmed":0,
        "buyer_id":'5e989024edf5632b2e9691ec',
        "service_id":'5e988e2189280c2746373c7a',
        "provider_id":'5e989024edf5632b2e9691ec',
        "paid":0,
	},
	{
        "category":'Handyman',
        "service":'Electricals',
        "payment":35,
        "confirmed":0,
        "buyer_id":'5e989024edf5632b2e9691ec',
        "service_id":'5e988e2189280c2746373c7a',
        "provider_id":'5e989024edf5632b2e9691ec',
        "paid":0,
	},
	{
        "category":'Handyman',
        "service":'Electricals',
        "payment":35,
        "confirmed":0,
        "buyer_id":'5e989024edf5632b2e9691ec',
        "service_id":'5e988e2189280c2746373c7a',
        "provider_id":'5e989024edf5632b2e9691ec',
        "paid":0,
	}
];

function deleteAllBookings() {
	return Bookings.deleteMany({})
		.then(() => {
			console.log('Deleted all bookings');
		})
		.catch((err) => {
			console.log('Failed to deleted all bookings');
			return Promise.reject(err);
		});
}

deleteAllBookings();

Bookings.create(bookings, (err, bookings) => {
	if (err) {
		throw (err);
	}
	console.log('Success', bookings);
	mongoose.connection.close();
});