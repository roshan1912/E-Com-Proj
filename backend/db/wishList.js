const mongoose = require("mongoose");
const wishListSchecma = new mongoose.Schema({
  productIds: Array(String),
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

const wishList = mongoose.model("wishList", wishListSchecma);

module.exports = wishList;
