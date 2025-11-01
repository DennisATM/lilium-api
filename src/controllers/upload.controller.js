import {express} from 'express';
import multer from 'multer';
import path from 'path';

// Configurar almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgProducts/') // asegúrate de que esta carpeta existe
    },
    filename: (req, file, cb) => {
        // Generar nombre único
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configurar multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        // Aceptar solo imágenes
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
});

export const uploadImage = async (req, res)=>{
    try {
        upload.single('image');
        res.status(200).json({
            filename: req.file.filename,
            path: `/imgProducts/${req.file.filename}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
         error: 'Error al subir archivo',
        data:null
     });
    }
}
