const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providersSchema = new Schema(
  {
    avatar: Object,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    user_id:[ {type: mongoose.Schema.Types.ObjectId, ref:"users"} ],
    address_l1:{ type: String, required: false },
    address_l2:{ type: String, required: false },
    address_city:{ type: String, required: false },
    address_code:{ type: String, required: false },
    ratings:{ type: Number},
    booking_ids:[ {type: mongoose.Schema.Types.ObjectId, ref:"bookings"} ],
    service_ids:[ { type: mongoose.Schema.Types.ObjectId, ref:"services"} ],
    wallet:Object,
    paid:[Boolean],
    extra:{String},
    role:{type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("providers", providersSchema);
