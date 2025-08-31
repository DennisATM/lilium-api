import express from 'express';
import { auth } from '../middlewares/auth.js';
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/', auth, addToCart);
router.get('/', auth, getCart);
router.put('/:itemId', auth, updateCartItem);
router.delete('/:itemId', auth, removeFromCart);
router.delete('/', auth, clearCart);

export default router;