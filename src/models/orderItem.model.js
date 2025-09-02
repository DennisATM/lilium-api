import {Model, DataTypes} from 'sequelize';
import { dbConfig } from '../config/db.config.js';

export class OrderItem extends Model {}

export const initOrderItem = (dbConfig)=>{
    OrderItem.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1  
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0  
            }
        }
    }, {
        sequelize: dbConfig,
        modelName: 'OrderItem',
        tableName: 'order_items',
        timestamps: true
    });
}