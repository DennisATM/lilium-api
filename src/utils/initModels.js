import { initUser } from "../models/user.model.js";
import { initProduct } from "../models/product.model.js";
import { initItemCart } from "../models/itemCart.model.js";
import { initOrderModel } from "../models/order.model.js";
import { initOrderItem } from "../models/orderItem.model.js";

export const initModels = (dbConfig)=>{
    try {
        initUser(dbConfig);
        initProduct(dbConfig);
        initItemCart(dbConfig);
        initOrderModel(dbConfig);
        initOrderItem(dbConfig);
    } catch (error) {
        console.error('No se pudieron inicializar los modelos', error);
    }
}