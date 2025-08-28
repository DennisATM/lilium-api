import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";

const router = Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);

export default router;