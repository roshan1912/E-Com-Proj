const express = require("express");
const productRouter = express.Router();

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getProductForListing,
} = require("../handlers/product-handler");

productRouter.get("/getAll", async (req, res) => {
  let products = await getProducts();
  res.status(200).send(products);
});

productRouter.get("/getBy/:id", async (req, res) => {
  let id = req.params["id"];
  let product = await getProductById(id);
  res.status(200).send(product);
});

productRouter.post("/add", (req, res) => {
  let product = req.body;
  addProduct(product)
    .then(() => {
      res.status(200).send({ message: "product added successfully" });
    })
    .catch((err) => {
      console.error(err);
    });
});

productRouter.put("/update/:id", async (req, res) => {
  let product = req.body;
  let id = req.params["id"];
  await updateProduct(id, product)
    .then(() => {
      res.status(200).send({ message: "product updated successfully" });
    })
    .catch((err) => {
      console.error(err);
    });
});

productRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteProduct(id)
    .then(() => {
      res.status(200).send({ message: "product deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = productRouter;
