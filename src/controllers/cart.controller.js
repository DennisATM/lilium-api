import { ItemCart } from "../models/itemCart.model.js";
import { Product } from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { idProduct, quantity } = req.body;
        const idUser = req.user.id;
        if (!idProduct || !quantity) return res.status(400).json({ message: "Faltan datos" });
        const product = await Product.findByPk(idProduct);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        if (quantity > product.stock) return res.status(400).json({ message: "Cantidad no disponible" });
        const itemCart = await ItemCart.create({ idUser, idProduct, quantity });
        return res.status(201).json(itemCart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
};

export const getCart = async (req, res) => {
    try {
        const idUser = req.user.id;
        const items = await ItemCart.findAll({ where: { idUser }, include: Product });
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
};
