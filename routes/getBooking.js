const BookingSchema = require("../models/bookings");

module.exports ={
    method: "GET",
    path: "/bookings/{id}",
    config:{
        auth: {
            strategy: 'jwtokenization',
            scope: ['provider']
        },
        handler: async (req, res) => {
            try {
                const bookingId = req.params.id;
                const booking = await BookingSchema.findById(bookingId).exec();
                return res.response(booking);
            } catch (error) {
                return res.response(error).code(500);
            }
        },
    }
};