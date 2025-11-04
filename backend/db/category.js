const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: String,
});

const category = mongoose.model("categories", categorySchema);

module.exports = category;
