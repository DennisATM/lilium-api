import {Model, DataTypes} from 'sequelize';

import {Product} from './product.model.js';
import { User } from './user.model.js';

export class ItemCart extends Model{};

export const initItemCart = (dbConfig)=>{
    ItemCart.init({
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                min:{
                    args:[1],
                    msg:['La cantidad mínima es 1']
                },
                max:{
                    args:[100],
                    msg:['La cantidad máxima es 100']
                }
            }
        }
    },{
        sequelize:dbConfig,
        modelName:'ItemCart',
        tableName:'item_carts',
        timestamps:true
    });
}