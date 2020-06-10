const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = new Schema(
    {
        category:{type: String},
        service:{type: String},
        payment:{type: Number},
        provider_id:{ type: mongoose.Schema.Types.ObjectId, ref:"providers" },
        service_id:{type: mongoose.Schema.Types.ObjectId, ref:"services" },
        buyer_id:{type: mongoose.Schema.Types.ObjectId, ref:"buyers"},
        confirmed:{type:Boolean},
        paid:{type:Boolean},
        date:{type: Date, default: Date.now}
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

module.exports = mongoose.model("bookings", bookingsSchema);
