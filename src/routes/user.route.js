import { Router } from "express";
import { createGuestUser, deleteUser, getAllUsers, getMe, loginUser, registerUser } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/guest", createGuestUser);
router.get("/me", auth, getMe);
router.get("/",getAllUsers);
router.delete("/:id",deleteUser);

export default router;