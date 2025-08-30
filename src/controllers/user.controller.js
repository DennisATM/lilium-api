import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { signToken } from "../utils/token.js";
import { config } from "../config/env.config.js";

const expiresIn = config.jwt.expiresIn;

// Register a new user or guest
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, direction, email, password, phone, admin } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios: firstName, lastName, email o password',
                status: 400
            });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                message: 'El correo electrónico ya está en uso. Inicia sesión o utiliza otro correo.',
                status: 409
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        //Si existe como invitado (guest) se actualiza a usuario registrado
        // if(existingUser && !existingUser.password) {
        //     existingUser.firstName = firstName;
        //     existingUser.lastName = lastName;
        //     existingUser.direction = direction;
        //     existingUser.password = hashedPassword;
        //     existingUser.isGuest = false;
        //     existingUser.phone = phone;
        //     await existingUser.save();

        //     const token = signToken({id:existingUser.id, email:existingUser.email, admin:existingUser.admin}, expiresIn);
        //     const {password, email,...userDataSafe} = existingUser.dataValues;
        //     return res.status(200).json({
        //         message: 'Usuario registrado con éxito',
        //         status: 200,
        //         data: { user: userDataSafe, token }
        //     });
        // }

        const newUser = await User.create({
            firstName,
            lastName,
            direction,
            email,
            password: hashedPassword,
            phone: phone || null,
            isGuest: false,
            admin: admin || false
        });

        const token = signToken({id:newUser.id, email:newUser.email, admin:newUser.admin}, expiresIn);
        const {password:_, email:__, ...newUserDataSafe} = newUser.dataValues;
        res.status(201).json({
            message: 'Usuario registrado con éxito',
            status: 201,
            data: { user: newUserDataSafe, token }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al registrar el usuario',
            status: 500
        });
    }
};

export const createGuestUser = async (req, res) => {
    try {
        const {firstName, lastName, direction, phone} = req.body;
        const guestUser = await User.create({ 
            firstName: firstName || 'Invitado',
            lastName: lastName || 'Invitado',
            direction: direction || null,
            phone: phone || null,
            isGuest: true
        });
        const token = signToken({id:guestUser.id, phone:guestUser.phone}, expiresIn);
        res.status(201).json({
            message: 'Usuario invitado creado con éxito',
            status: 201,
            data: { user: guestUser, token }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el usuario invitado',
            status: 500
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({attributes: { exclude: ['email', 'password'] }});
        
        res.status(200).json({
            message: 'Usuarios obtenidos con éxito',
            status: 200,
            data: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            status: 500
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                status: 404
            });
        }
        await user.destroy();
        res.status(200).json({
            message: 'Usuario eliminado con éxito',
            status: 200
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al eliminar el usuario',
            status: 500
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;   
        if (!email || !password) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios: email o password',
                status: 400
            });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                status: 404
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Contraseña incorrecta',
                status: 401
            });
        }
        const token = signToken({id:user.id, email:user.email, admin:user.admin}, expiresIn);
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            status: 200,
            data: { user, token }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al iniciar sesión',
            status: 500
        });
    }
};