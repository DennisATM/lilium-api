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
        const { name, description, price, stock, imageUrl, category} = req.body;
        const newProduct = await Product.create({ name, description, price, stock, imageUrl, category });
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

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado',
                status: 404,
                data: null
            });
        }
        res.status(200).json({
            message: 'Producto obtenido con éxito',
            status: 200,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el producto',
            status: 500,
            data: null
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, imageUrl,isRecommended, category } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado',
                status: 404,
                data: null
            });
        }
        await product.update({ name, description, price, stock, imageUrl, isRecommended, category });
        res.status(200).json({
            message: 'Producto actualizado con éxito',
            status: 200,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar el producto',
            status: 500,
            data: null
        });
    }
}

export const filterProducts = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, order, dir,category } = req.query;

    const where = {};

    // 🔹 Filtrar por nombre
    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    // 🔹 Filtrar por rango de precios
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }
    //filtrar por categoria
    if(req.query.category){
        where.category = category;
    }

    // 🔹 Ordenamiento
    let orderBy = [];
    if (order) {
      const validFields = ["name", "price", "stock", "id", "category"]; // campos válidos
      const validDirections = ["asc", "desc"];
      const field = validFields.includes(order) ? order : "id";
      const direction = validDirections.includes(dir?.toLowerCase()) ? dir.toUpperCase() : "ASC";

      orderBy = [[field, direction]];
    }

    const products = await Product.findAll({
      where,
      order: orderBy,
    });

    res.status(200).json({
        message: 'Productos filtrados obtenidos con éxito',
        status: 200,
        data:products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado',
                status: 404,
                data: null
            });
        }  
        await product.destroy();
        res.status(200).json({
            message: 'Producto eliminado con éxito',
            status: 200,
            data: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el producto',
            status: 500,
            data: null
        });
    }  
}