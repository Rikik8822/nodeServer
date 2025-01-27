import { prodModel } from "../models/productModel.js";

export async function getAllProd(req, res) {

    try {
        let result = await prodModel.find();
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "cannot find the prodact", message: err.message })
    }
}
export async function getProdById(req, res) {
    let { id } = req.params;
    try {
        let result = await prodModel.findById(id);
        if (!result)
            return res.status(404).json({ title: "cannot get product by id", message: "no product with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: " cannot get product by id", message: err.message })
    }
    
    
}
export async function deleteProd(req, res) {
    let { id } = req.params;
    try {
        let result = await prodModel.findByIdAndDelete(id);
        if (!result)
            return res.status(404).json({ title: "cannot delete product by id", message: "no product with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "cannot delete product by id ", message: err.message })
    }
}
export async function updateProd(req, res) {
    let { id } = req.params;
    try {
        let result = await prodModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update product by id", message: "no product with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "cannot update product by id ", message: err.message })
    }
}
export async function addProd(req, res) {
    let { body } = req;

    // בדיקות תקינות לשדות חובה
    if (!body.name || !body.price) {
        return res.status(400).json({ 
            title: "Missing data in body", 
            message: "Fields 'name' and 'price' are required." 
        });
    }

    // בדיקת מחיר חיובי
    if (body.price <= 0) {
        return res.status(400).json({ 
            title: "Invalid price", 
            message: "Price must be a positive number." 
        });
    }

    try {
        // יצירת מוצר חדש ושמירתו
        let newProd = new prodModel({
            name: body.name,
            price: body.price,
            description: body.description || "", // ברירת מחדל לתיאור ריק
            tags: body.tags || [], // ברירת מחדל למערך ריק
            manufactureDate: body.manufactureDate || new Date(), // תאריך ייצור ברירת מחדל להיום
            imageUrl: body.imageUrl || "" // ברירת מחדל לכתובת תמונה ריקה
        });

        await newProd.save();
        res.status(201).json(newProd); // 201: נוצר בהצלחה
    } catch (err) {
        res.status(500).json({ 
            title: "Failed to add product", 
            message: err.message 
        });
    }
}
