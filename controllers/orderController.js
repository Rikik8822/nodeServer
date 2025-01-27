import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";

export async function getAllOrders(req, res) {
    try {
        let result = await orderModel.find();
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to fetch orders", message: err.message });
    }
}

export async function getOrdersByUserId(req, res) {
    let { id } = req.params;
    try {
        let result = await orderModel.findById(id);
        if (!result)
            return res.status(404).json({ title: "Cannot fetch order by ID", message: "No order found with this ID" });
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to fetch order by ID", message: err.message });
    }
}

export async function deleteOrder(req, res) {
    let { id } = req.params;
    try {
        let order = await orderModel.findById(id);
        if (!order)
            return res.status(404).json({ title: "Cannot delete order", message: "No order found with this ID" });

        if (order.isShipped) {
            return res.status(400).json({ title: "Cannot delete shipped order", message: "Order has already been shipped" });
        }

        let result = await orderModel.findByIdAndDelete(id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to delete order", message: err.message });
    }
}

export async function updateOrder(req, res) {
    let { id } = req.params;
    try {
        let result = await orderModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ title: "Cannot update order", message: "No order found with this ID" });
        res.json(result);
    } catch (err) {
        res.status(400).json({ title: "Failed to update order", message: err.message });
    }
}

export async function addOrder(req, res) {
    let { body } = req;

    // בדיקות תקינות בסיסיות
    if (!body.date || !body.dueDate || !body.address || !body.userId || !body.products || body.products.length === 0) {
        return res.status(400).json({ title: "Missing data in body", message: "date, dueDate, address, userId, and products are required" });
    }

    try {
        // בדיקה אם המשתמש קיים
        const userExists = await userModel.findById(body.userId);
        if (!userExists) {
            return res.status(404).json({ title: "User not found", message: "No user found with this ID" });
        }

        // יצירת הזמנה חדשה
        let newOrder = new orderModel(body);
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ title: "Failed to add order", message: err.message });
    }
}











































































































































































































































































