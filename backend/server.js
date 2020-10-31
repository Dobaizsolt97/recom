//the import statements are available beacuse in the package.json file we have added the flag, "type":"module"
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
//connecting to Mongo
connectDB();
//initialize the app
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Process is running on port ${PORT}, in ${process.env.NODE_ENV} mode`.yellow
      .bold
  )
);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use(notFound);

app.use(errorHandler);
