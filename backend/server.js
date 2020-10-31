//the import statements are available beacuse in the package.json file we have added the flag, "type":"module"
import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Process is running on port ${PORT}, in ${process.env.NODE_ENV} mode`.yellow
      .bold
  )
);

app.get("/", (req, res) => {
  res.send("api is running");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});
