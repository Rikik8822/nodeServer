import { Router } from "express";

import { addProd, deleteProd, getAllProd, getProdById, updateProd } from "../controllers/productController.js";


const router = Router();
router.get("/", getAllProd)
router.get("/:id", getProdById)
router.delete("/:id", deleteProd)
router.put("/:id", updateProd)
router.post("/", addProd);

export default router;