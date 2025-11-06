const express = require("express");
const customerRouter = express.Router();
const {
  getNewProducts,
  getFeaturedProducts,
  getProductForListing
} = require("../handlers/product-handler");

const { getCategories } = require("../handlers/category-handler");

customerRouter.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.status(200).send(products);
});

customerRouter.get("/products", async (req, res) => {
  const { searchText, categoryId, sortBy, sortOrder } = req.query;
  let products = await getProductForListing(
    searchText,
    categoryId,
    sortBy,
    sortOrder
  );
  res.status(200).send(products);
});

customerRouter.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.status(200).send(products);
});

customerRouter.get("/getCategories", async (req, res) => {
  const categories = await getCategories();
  res.status(200).send(categories);
});

module.exports = customerRouter;
