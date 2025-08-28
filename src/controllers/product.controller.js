import { Product } from "../models/product.model.js";
import { Op } from "sequelize";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({
            message: 'Productos obtenidos con éxito',
            status: 200,
            data: products
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los productos',
            status: 500,
            data: null
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;
        const newProduct = await Product.create({ name, description, price, stock, imageUrl });
        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el producto',
            status: 500,
            data: null
        });
    }
}