const Category = require("../db/category");

async function addCategory(category) {
  let newcategory = new Category({
    name: category.name,
  });
  await newcategory.save();
  newcategory.toObject();
}

async function getCategories() {
  let categoreies = await Category.find();
  return categoreies.map((category) => category.toObject());
}

async function getCategoryById(id) {
  let category = await Category.findById(id);
  return category.toObject();
}

async function updateCategory(id, category) {
  await Category.findOneAndUpdate({ _id: id }, category);
  return;
}

async function deleteCategory(id) {
  await Category.findByIdAndDelete(id);
  return;
}

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
};
