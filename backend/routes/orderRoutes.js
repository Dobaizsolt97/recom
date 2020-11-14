import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, isAdmin, getOrders);
// very strange eeror if i move this to the bottom (fails to cast)
router.route("/myorders").get(protect, getMyOrders);
// this /: must be at the bottom to make sure the server does not make a mistake and take it as something else
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
