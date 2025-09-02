import jwt from "jsonwebtoken";
import {config} from "../config/env.config.js";

const secret  = config.jwt.secret;

export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) return res.status(401).json({ message: "Token Requerido" });

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token Inválido o expirado" });
    }  
};

export const authAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) return res.status(401).json({ message: "Token Requerido" });

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        if (req.user.admin !== true ) {
            return res.status(403).json({ message: 'Acceso denegado. Requiere rol de administrador.' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token Inválido o expirado" });
    }
};