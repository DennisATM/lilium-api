import { Router } from "express";
import { createProduct, deleteProduct, filterProducts, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { authAdmin } from "../middlewares/auth.js";

const router = Router();

router.get('/products', getAllProducts);
router.post('/products', authAdmin, createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', authAdmin, updateProduct);
router.get('/filter', filterProducts);
router.delete('/products/:id', authAdmin, deleteProduct);

export default router;