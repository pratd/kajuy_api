const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema(
  {
    category: {type: String},
    service: {type: String},
    provider_id:{type: mongoose.Schema.Types.ObjectId, ref:"providers"},
    extra:{type: String},
    date:{type: Date, default: Date.now},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("services", servicesSchema);
