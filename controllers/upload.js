import {Storage}from "@google-cloud/storage"
import  multer from "multer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

//Configuro credenciales de almacenamiento en google cloud storage
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename:process.env.GOOGLE_CLOUD_CREDENTIALS
    });
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

// Configuración de Multer Validación de tipos de archivos y generación de almacenamiento
export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
        return cb(new Error('Tipo de archivo inválido. Solo se permiten .jpg, .jpeg y .png'), false);
      }
      cb(null, true); // Continúa si el tipo de archivo es válido
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // Tamaño máximo de archivo: 5MB
    },
  });

// Subo los archivos a google cloud storage. Recibo archivos, que, dependiendo de si son cover o galería se almacenan distintos
// De cover photo acepto un unico archivo y de la galería acepto como máximo 10

export const uploadFileToGCS = async (file) => {
    // Creo un objeto file dentro del bucket que se había creado previamente
    const blob = bucket.file(`uploads/${Date.now()}_${file.originalname}`);
    // Creo un flujo de escritura en el bucket sobre el blob
    const blobStream = blob.createWriteStream({
      resumable: true,
      contentType: file.mimetype,
    });
    
    // Manejo una promesa en la subida de archivos y en
    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => reject(err));
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });
      blobStream.end(file.buffer);
    });
  };