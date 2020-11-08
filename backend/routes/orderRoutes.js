import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems);
// very strange eeror if i move this to the bottom (fails to cast)
router.route("/myorders").get(protect, getMyOrders);
// this /: must be at the bottom to make sure the server does not make a mistake and take it as something else
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
