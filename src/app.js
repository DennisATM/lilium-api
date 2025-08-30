import express, {urlencoded} from 'express';
import cors from 'cors';

import { serverInit } from './services/serverInit.js'
import {config} from './config/env.config.js';

import productsRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import cartRouter from './routes/cart.route.js';

const {port} = config;

export const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));

// Llamada a las rutas de productos
app.use('/api/v1', productsRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/cart', cartRouter);

serverInit(app, port);