const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  purchasePrice: Number,
  sellingPrice: Number,
  images: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "brands" },
  isFeatured: Boolean,
  isNewArrival: Boolean,
});

const product = mongoose.model("products", productSchema);

module.exports = product;
