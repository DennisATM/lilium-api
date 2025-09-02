import {Model, DataTypes} from 'sequelize';
import {dbConfig} from '../config/db.config.js';

export class Order extends Model {}

export const initOrderModel = async () => {
    Order.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending',
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    }, {
        sequelize: dbConfig,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true
    }); 
}