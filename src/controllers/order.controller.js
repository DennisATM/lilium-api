import { Order } from '../models/order.model.js';
import { OrderItem } from '../models/orderItem.model.js';
import { Product } from '../models/product.model.js';

export const createOrder = async (req, res) => {
    try {
        const { items, total } = req.body;
        const idUser = req.user.id;
        const status = 'pending';

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }
        const order = await Order.create({idUser, total, status});
        for (const item of items) {
            const product = await Product.findByPk(item.idProduct);
            // console.log(item.idProduct);
            await OrderItem.create({
                idOrder: order.id,
                idProduct: item.idProduct,
                quantity: item.quantity,
                price: product.price
            });
        }
        res.status(201).json({ message: 'Orden creada con éxito', idOrder: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la orden' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: OrderItem }]
        });
        res.status(200).json(
            {
                message: 'Órdenes obtenidas con éxito',
                data: orders
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las órdenes' });
    }   
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: 'Estado de la orden actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el estado de la orden' });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [{ model: OrderItem }]
        });
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }   
        res.status(200).json(
            {
                message: 'Orden obtenida con éxito',
                data: order
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la orden' });
    }   
};