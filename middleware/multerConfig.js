import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // Nombre único para cada archivo
  },
});

// Filtros para tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido'), false); // Rechaza el archivo
  }
};

// Configuración de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB por archivo
});

export default upload;
