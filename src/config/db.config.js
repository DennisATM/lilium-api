import { Sequelize } from "sequelize";
import { config } from "./env.config.js";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// let dbConfig;

// if (process.env.DATABASE_URL) {
//   // 🔹 Render (usa la URL interna)
//   console.log("Conectando a Render DB...");
//   dbConfig = new Sequelize(process.env.DATABASE_URL, {
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // necesario en Render
//       },
//     },
//   });
// } else {
//   // 🔹 Local (usa tu archivo .env normal)
//   console.log("Conectando a BD local...");
//   const { host, user, pass, name, dialect, port } = config.db;
//   dbConfig = new Sequelize(name, user, pass, {
//     host,
//     port,
//     dialect,
//   });
// }

// export { dbConfig };