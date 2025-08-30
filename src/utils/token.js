import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";

export const signToken = (payload, expiresIn ) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn });
}