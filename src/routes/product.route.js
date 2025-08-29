import { Router } from "express";
import { createProduct, deleteProduct, filterProducts, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.get('/filter', filterProducts);
router.delete('/products/:id', deleteProduct);

export default router;