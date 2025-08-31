import { ItemCart } from "../models/itemCart.model.js";
import { Product } from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { idProduct, quantity } = req.body;
        const idUser = req.user.id;
        if (!idProduct || !quantity) return res.status(400).json({ message: "Faltan datos" });
        const product = await Product.findByPk(idProduct);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        console.log(product.stock);
        if (quantity > product.stock) return res.status(400).json({ message: "Cantidad no disponible" });
        
        // Verificar si el producto ya está en el carrito del usuario
        const existingItem = await ItemCart.findOne({ where: { idUser, idProduct } });
        if (existingItem) {
            // Si ya está, actualizar la cantidad
            existingItem.quantity += quantity;
            if (existingItem.quantity > product.stock) return res.status(400).json({ message: "Cantidad no disponible" });
            await existingItem.save();
            return res.status(200).json(
                {
                    message: "Cantidad actualizada en el carrito",
                    data: existingItem
                }
            );
        }

        const itemCart = await ItemCart.create({ idUser, idProduct, quantity });
        return res.status(201).json(
            {
                message: "Producto agregado al carrito",
                data: itemCart
            }
        );
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
};

export const getCart = async (req, res) => {
    try {
        const idUser = req.user.id;
        const items = await ItemCart.findAll({ where: { idUser }, include: Product });
        return res.status(200).json({
            message:"Elementos en el carrito",
            count: items.length,
            data:items
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
};

export const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const idUser = req.user.id;
        if (!quantity) return res.status(400).json({ message: "Faltan datos" });
        const item = await ItemCart.findOne({ where: { id: itemId, idUser }, include: Product });
        if (!item) return res.status(404).json({ message: "Item no encontrado en el carrito" });
        if (quantity > item.Product.stock) return res.status(400).json({ message: "Cantidad no disponible" });
        item.quantity = quantity;
        await item.save();
        return res.status(200).json(
            {
                message: "Cantidad actualizada",
                data: item
            }
        );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const idUser = req.user.id;
        const item = await ItemCart.findOne({ where: { id: itemId, idUser } });
        if (!item) return res.status(404).json({ message: "Item no encontrado en el carrito" });
        await item.destroy();
        return res.status(200).json({ message: "Item eliminado del carrito" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const idUser = req.user.id;
        await ItemCart.destroy({ where: { idUser } });
        return res.status(200).json({ message: "Carrito vaciado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};