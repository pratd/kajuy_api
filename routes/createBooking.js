const BookingModel = require("../models/services");
const BuyerModel = require("../models/buyers");
const ProviderModel = require("../models/providers");
const verifyBookingSchema = require("../schemas/verifyBooking").verifyBookingSchema;
module.exports = {
    method: "POST",
    path: "/booking/add",
    config: {
        auth: {
            strategy: "jwtokenization",
            scope: ["buyer"],
        },
        payload: {
        output: "stream",
        parse: true,
        allow: [
            "application/json",
            "multipart/form-data",
            "image/jpeg",
            "application/pdf",
            "application/x-www-form-urlencoded",
        ],
        multipart: true,
        maxBytes: 1024 * 1024 * 100,
        timeout: false,
    },
    handler: async (req, res) => {
        const data = req.payload;
        //* creating a new service
        let booking = new BookingModel();
        booking.category = data.category;
        booking.service = data.service;
        booking.payment = data.payment;
        booking.buyer_id= req.auth.credentials.id;
        booking.provider_id =data.provider_id;
        booking.service_id = data.service_id;
        //updating the bookings and the buyer and provider model
        try {
        await booking.save();
        //update buyer and provider classes
        let buyerValues = await BuyerModel.findById(
            req.auth.credentials.id
        );
        buyerValueIds = buyerValues.booking_ids;
        buyerValueIds.push(booking.id);
        await BuyerModel.findByIdAndUpdate(
            { _id: req.auth.credentials.id },
            {
            booking_ids:buyerValueIds,
            }
        );
        //same with the providers
        let providerValues = await ProviderModel.findById(
            data.provider_id
        );
        providerValueIds = providerValues.booking_ids;
        providerValueIds.push(booking.id);
        await ProviderModel.findByIdAndUpdate(
            { _id: data.provider_id },
            {
            booking_ids:providerValueIds,
            }
        );
        return res.response("New booking saved to database");
        } catch(err) {
        return res.response("There was an error trying to create this booking");
        }
    },
    validate: {
        payload: verifyBookingSchema,
        //! show the error returned in the fields for POSTMAN
        failAction: (request, h, err) => {
            return err;
        },
    },
    },
};
