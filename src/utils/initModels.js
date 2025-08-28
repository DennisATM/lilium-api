import { initUser } from "../models/user.model.js";
import { initProduct } from "../models/product.model.js";

export const initModels = (config)=>{
    try {
        initUser(config);
        initProduct(config);
    } catch (error) {
        console.error('No se pudieron inicializar los modelos', error);
    }
}