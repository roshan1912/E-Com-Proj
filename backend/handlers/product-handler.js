const Product = require("../db/products");

async function getProducts() {
  let products = await Product.find();
  return products.map((product) => product.toObject());
}

async function addProduct(product) {
  let newProduct = new Product({
    ...product,
  });
  await newProduct.save();
  return newProduct.toObject();
}

async function updateProduct(id, product) {
  await Product.findByIdAndUpdate({ _id: id }, product);
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

async function getProductById(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

async function getNewProducts() {
  let products = await Product.find({ isNewArrival: true });
  return products.map((product) => product.toObject());
}

async function getProductForListing(
  searchText,
  categoryId,
  page,
  pageSize,
  sortBy,
  sortOrder
) {
  let filter = {};
  if (!sortBy) {
    sortBy = "price";
  }
  if (!sortOrder) {
    sortOrder = -1;
  }
  if (searchText) {
    filter.name = searchText;
  }
  if (categoryId) {
    filter.categoryId = categoryId;
  }

  var products = await Product.find(filter)
    .sort({ sortBy: sortOrder })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return products.map((x) => x.toObject());
}

async function getFeaturedProducts() {
  let products = await Product.find({ isFeatured: true });
  return products.map((product) => product.toObject());
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
