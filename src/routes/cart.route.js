import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addToCart, getCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/', auth, addToCart);
router.get('/', auth, getCart);

export default router;