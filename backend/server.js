//the import statements are available beacuse in the package.json file we have added the flag, "type":"module"
import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();
//connecting to Mongo
connectDB();
//initialize the app
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Process is running on port ${PORT}, in ${process.env.NODE_ENV} mode`.yellow
      .bold
  )
);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.send("api is running");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorHandler);
