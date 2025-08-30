import { ItemCart } from "./itemCart.model.js";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

export const setupCartRelations = ()=>{
    //Relations
    ItemCart.belongsTo(Product,{foreignKey:'idProduct'});
    Product.hasMany(ItemCart,{foreignKey:'idProduct'});

    ItemCart.belongsTo(User,{foreignKey:'idUser'});
    User.hasMany(ItemCart,{foreignKey:'idUser'});
}