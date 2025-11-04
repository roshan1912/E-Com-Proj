const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  productIds: Array(String),
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
