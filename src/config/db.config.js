// import { Sequelize } from "sequelize";
// import { config } from './env.config.js';

// const { host, user, pass, name, dialect, port} = config.db; 

// export const dbConfig = new Sequelize(name, user, pass, {
//     host: host,
//     port: port,
//     dialect: dialect
// })

import { Sequelize } from "sequelize";
import { config } from "./env.config.js";
import dotenv from "dotenv";

dotenv.config();

let dbConfig;

if (process.env.DATABASE_URL) {
  // 🔹 Render (usa la URL interna)
  console.log("Conectando a Render DB...");
  dbConfig = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario en Render
      },
    },
  });
} else {
  // 🔹 Local (usa tu archivo .env normal)
  console.log("Conectando a BD local...");
  const { host, user, pass, name, dialect, port } = config.db;
  dbConfig = new Sequelize(name, user, pass, {
    host,
    port,
    dialect,
  });
}

export { dbConfig };