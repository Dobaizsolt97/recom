import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
