import multer from 'multer';
import cloudinary from '../config/cloudinary.config.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configurar almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lilium-products', // carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // opcional: redimensionar
    }
});

// Configurar multer con Cloudinary
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
});

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                ok: false,
                error: 'Archivo no proporcionado'
            });
        }

        // req.file ya contiene la información de Cloudinary
        res.status(200).json({
            ok: true,
            imageUrl: req.file.path, // URL de Cloudinary
            public_id: req.file.filename // ID público en Cloudinary
        });

    } catch (error) {
        console.error('Error al subir imagen:', error);
        res.status(500).json({
            ok: false,
            error: 'Error al subir archivo',
            data: null
        });
    }
};