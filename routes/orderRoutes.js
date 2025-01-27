import { Router } from "express";
import {getAllOrders, addOrder,deleteOrder,getOrdersByUserId,updateOrder} from "../controllers/orderController.js";

const router = Router();
router.get("/", getAllOrders);
router.post("/", addOrder);
router.delete("/:id", deleteOrder);
router.get("/user/:userId", getOrdersByUserId);
router.put("/:id", updateOrder);

export default router;
