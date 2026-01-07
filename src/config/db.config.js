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
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necesario en Render
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
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