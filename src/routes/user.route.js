import { Router } from "express";
import { createGuestUser, deleteUser, getAllUsers, loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/guest", createGuestUser);
router.get("/",getAllUsers);
router.delete("/:id",deleteUser);

export default router;