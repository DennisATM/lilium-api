import {Model, DataTypes} from 'sequelize';

export class Product extends Model{};
export const initProduct = (dbConfig)=>{
    Product.init({
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING(150),
            allowNull:false,
            validate:{
                notEmpty:{msg:'El nombre del producto no puede estar vacío'},
                len:{
                    args:[2,150],
                    msg:['La longitud del nombre debe ser mayor a 1 y menor a 150']
                }
            }
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:{msg:'La descripción del producto no puede estar vacía'},
                len:{
                    args:[10,1000],
                    msg:['La longitud de la descripción debe ser mayor a 9 y menor a 1000']
                }
            }
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isDecimal:{msg:'El precio debe ser un valor entero'},
                min:{
                    args:[0],
                    msg:['El precio no puede ser un valor negativo']
                }
            }
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isInt:{msg:'El stock debe ser un valor entero'},
                min:{
                    args:[0],
                    msg:['El stock no puede ser un valor negativo']
                }
            }
        },
        imageUrl:{
            type:DataTypes.STRING,
            allowNull:true,
            
        },
        isRecommended:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        category:{
            type:DataTypes.ENUM('velas','ambientadores','difusores','detalles'),
            allowNull:false,
            validate:{
                isIn:{
                    args:[['velas','ambientadores','difusores','detalles']],
                    msg:'La categoría debe ser una de las siguientes: velas, inciensos, difusores, baño, accesorios',
                }
            }
        }
    },{
        sequelize:dbConfig,
        modelName:'Product',
        tableName:'products',
        timestamps:true
    });
}