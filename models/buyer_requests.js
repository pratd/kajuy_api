const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyersRequestsSchema = new Schema(
  {
    service_id: { type: mongoose.Schema.Types.ObjectId, ref:"services" },
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: "providers" },
    provider_name: String,
    provider_email: String,
    provider_phone: String,
    buyer_name: String,
    buyer_email: String,
    buyer_message: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("buyersRequests", buyersRequestsSchema);
