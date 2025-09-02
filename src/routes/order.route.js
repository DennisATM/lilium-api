import express from 'express';

import { auth, authAdmin } from '../middlewares/auth.js';
import { createOrder, getOrderById, getOrders, updateOrderStatus } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', authAdmin, getOrders);
router.post('/', auth, createOrder);
router.get('/:id', auth, getOrderById);
router.put('/:id', authAdmin, updateOrderStatus);

export default router;