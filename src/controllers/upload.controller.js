import multer from 'multer';
import cloudinary from '../config/cloudinary.config.js';
import streamifier from 'streamifier';

// Usar memoria para obtener buffer y enviarlo a Cloudinary
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Solo se permiten imágenes'), false);
  },
});

// Controlador que sube buffer a Cloudinary
export const uploadImage = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ ok: false, error: 'No se recibió ningún archivo' });
    }

    const options = {
      folder: 'lilium-products',
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ ok: false, error: 'Error al subir a Cloudinary' });
        }
        return res.status(200).json({
          ok: true,
          imageUrl: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    // Convertir buffer a stream y pipear a Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error('uploadImage error:', err);
    return res.status(500).json({ ok: false, error: 'Error del servidor' });
  }
};