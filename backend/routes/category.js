const express = require("express");
const categoryRouter = express.Router();

const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} = require("../handlers/category-handler");

categoryRouter.get("/getAll", async (req, res) => {
  let categories = await getCategories();
  res.send(categories);
});

categoryRouter.get("/getBy/:id", async (req, res) => {
  let id = req.params["id"];
  let category = await getCategoryById(id);
  res.send(category);
});

categoryRouter.post("/add", (req, res) => {
  let category = req.body;
  addCategory(category)
    .then(() => {
      res.status(200).send({ message: "category added successfully" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ message: "failed to add category", error: err.message || err });
    });
});

categoryRouter.put("/update/:id", async (req, res) => {
  let category = req.body;
  let id = req.params["id"];
  await updateCategory(id, category)
    .then(() => {
      res.status(200).send({ message: "category updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "failed to update category",
        error: err.message || err,
      });
    });
});

categoryRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params["id"];
  await deleteCategory(id)
    .then(() => {
      res.status(200).send({ message: "category deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "failed to delete category",
        error: err.message || err,
      });
    });
});

module.exports = categoryRouter;
