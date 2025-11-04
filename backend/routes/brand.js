const express = require("express");
const brandRouter = express.Router();

const {
  addBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../handlers/brand-handler");

brandRouter.get("", async (req, res) => {
  let brands = await getBrands();
  res.status(200).send(brands);
});

brandRouter.get("/:id", async (req, res) => {
  let id = req.params["id"];
  let brands = await getBrandById(id);
  res.status(200).send(brands);
});

brandRouter.post("", (req, res) => {
  let brand = req.body;
  addBrand(brand)
    .then(() => {
      res.status(200).send({ message: "brand added successfully" });
    })
    .catch((err) => {
      console.error(err);
    });
});

brandRouter.put("/:id", async (req, res) => {
  let brand = req.body;
  let id = req.params["id"];
  await updateBrand(id, brand)
    .then(() => {
      res.status(200).send({ message: "brand updated successfully" });
    })
    .catch((err) => {
      console.error(err);
    });
});

brandRouter.delete("/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteBrand(id)
    .then(() => {
      res.status(200).send({ message: "brand deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = brandRouter;
