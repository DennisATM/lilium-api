import { ItemCart } from "./itemCart.model.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./orderItem.model.js";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

export const setupCartRelations = ()=>{
    //Relations
    ItemCart.belongsTo(Product,{foreignKey:'idProduct'});
    Product.hasMany(ItemCart,{foreignKey:'idProduct'});

    ItemCart.belongsTo(User,{foreignKey:'idUser'});
    User.hasMany(ItemCart,{foreignKey:'idUser'});
}

export const setupOrderRelations = ()=>{
    //Relations Orders

    //Order - User
    Order.belongsTo(User,{foreignKey:'id'});
    User.hasMany(Order,{foreignKey:'idUser'});

    //Order - OrderItems
    Order.hasMany(OrderItem,{foreignKey:'idOrder'});
    OrderItem.belongsTo(Order,{foreignKey:'id'});

    //OrderItem - Product
    OrderItem.belongsTo(Product,{foreignKey:'id'}); 
    Product.hasMany(OrderItem,{foreignKey:'idProduct'});
}