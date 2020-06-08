const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyersSchema = new Schema(
    {
    avatar: Object,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    address_l1:{ type: String, required: false },
    address_l2:{ type: String, required: false },
    address_city:{ type: String, required: true },
    address_code:{ type: String, required: false },
    wallet:Object,
    booking_ids:{ type: mongoose.Schema.Types.ObjectId, ref:"bookings" },
    paid:[Boolean],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

module.exports = mongoose.model("buyers", buyersSchema);
