const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  date: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  items: Array(String),
  status: String,
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;
