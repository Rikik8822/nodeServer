import { Router } from "express";

import { getAllUsers,addUser_signUp,getUseByUsernamePassword_login,getUserById,updateUser,updatePassword } from "../controllers/userController.js";


const router = Router();
router.get("/",getAllUsers )
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/", addUser_signUp);
router.put("/:id/password", updatePassword);
router.post("/login/", getUseByUsernamePassword_login);

export default router;