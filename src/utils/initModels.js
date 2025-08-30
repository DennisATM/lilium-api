import { initUser } from "../models/user.model.js";
import { initProduct } from "../models/product.model.js";
import { initItemCart } from "../models/itemCart.model.js";

export const initModels = (dbConfig)=>{
    try {
        initUser(dbConfig);
        initProduct(dbConfig);
        initItemCart(dbConfig);
    } catch (error) {
        console.error('No se pudieron inicializar los modelos', error);
    }
}