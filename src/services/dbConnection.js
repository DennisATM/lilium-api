import { dbConfig } from "../config/db.config.js"
import { initModels } from "../utils/initModels.js";

export const dbConnect = async ()=>{
    try {
        await dbConfig.authenticate();
        initModels(dbConfig);
        await dbConfig.sync({alter:true});
        console.log('Logramos conectarnos a la BD a traves de Sequelize');       
    } catch (error) {
        console.error('No pudimos conectarnos a la DB 😒', error);
        process.exit(1);
    }
}