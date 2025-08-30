import {Model, DataTypes} from 'sequelize';

export class User extends Model{};

export const initUser = (dbConfig)=>{
    User.init({
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        firstName:{
            type:DataTypes.STRING(100),
            allowNull:false,
            validate:{
                notEmpty:{msg:'El nombre no puede estar vacío'},
                len:{
                    args:[2,100],
                    msg:['La longitud del nombre debe ser mayor a 1 y menor a 100']
                },
                is:{
                    args:/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                    msg:['El nombre solo puede contener letras del abecedario español']
                }
            }
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{msg:'Los apellidos no pueden estar vacíos'},
                len:{
                    args:[4,100],
                    msg:['Los apellidos deben contener entre 5 y 100 caracteres']
                },
                is:{
                    args:/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/,
                    msg:['Los apellidos sólo pueden contener letras del abecedario español']
                }
            }
        },
        direction:{
            type:DataTypes.STRING,
            allowNull:true,
            validate:{
                len:{
                    args:[10,200],
                    msg:['La dirección debe contener entre 10 y 200 caracteres']
                }
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true,
            unique:{msg:'El correo electrónico ingresado ya está en uso'},
            validate:{
                notEmpty:{msg:'El email no debe ser un dato vacío'},
                isEmail:{msg:'El correo electrónico ingresado no es válido'}
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:true
        },
        admin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        isGuest:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:true, 
            validate:{
                is:{
                    args:/^\+?[0-9]{7,15}$/,
                    msg:['El número telefónico no es válido']
                }
            }
        }
    },{
        sequelize:dbConfig,
        modelName:'User',
        tableName:'users',
        timestamps:true
    });
}