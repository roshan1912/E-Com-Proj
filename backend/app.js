const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const categoryRouter = require("./routes/category");
const brandRouter = require("./routes/brand");
const productRouter = require("./routes/product");
const customerRouter = require("./routes/customer");
const authRouter = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/category", verifyToken, isAdmin, categoryRouter);
app.use("/brand", verifyToken, isAdmin, brandRouter);
app.use("/product", verifyToken, isAdmin, productRouter);
app.use("/customer", verifyToken, customerRouter);
app.use("/auth", authRouter);

async function connectDB() {
  mongoose.connect("mongodb://localhost:27017/my-ecom-proj", {
    dbName: "my-ecom-store-db",
  });
  console.log("mongo connected");
}

connectDB()
  .then(() => {})
  .catch((err) => {});

app.listen(PORT, () => {
  console.log("locahost running on port :", PORT);
});
