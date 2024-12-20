import express from "express";
import cors from "cors";


import { connectDB } from "./config/connectdb.js";
import dotenv from "dotenv";
import loginRouter from "./routes/auth.js";
import formRouter from "./routes/form.js";
import path from "path";
import { fileURLToPath } from "url";

import Limiter from "./middleware/limiter.js"; // Middleware personalizado de rate limit
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();

// Conexión a la base de datos
await connectDB();
console.log("Base de datos conectada exitosamente.");

const app = express();

// Middlewares globales
// app.use(express.json({ limit: "10kb" })); // Limita el tamaño del body a 10 KB
app.use(express.json({limit:'50mb'})); 
app.use(express.urlencoded({extended:true, limit:'50mb'})); 
 // Limita el tamaño del body a 10 KB
const corsOptions = {
  origin:process.env.FRONTEND_URL, // Ajusta a tu dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true,
};
app.use(cors(corsOptions));

app.use(ExpressMongoSanitize())
// Rate limiting
app.set('trust proxy', 1); 
app.use(Limiter); // Middleware para limitar solicitudes

// Configuración para archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Servir archivos estáticos

// Rutas
app.use("/auth", loginRouter);
app.use("/api", formRouter);



// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack); // Registro del error en consola

  // Fix rápido para mostrar al usuario si hay errores en la subida de archivos
  if(err.message){
    if(err.message == "File too large"){
      return res.status(400).json({
        message: "Uno de los archivos excede el tamaño permitido. Se permite como máximo 5MB por archivo",
       
      });
    }else if (err.message.indexOf("Tipo de archivo inválido") !== -1) {
      return res.status(400).json({
        message: err.message
        
      });
    }
  }

 
   res.status(500).json({ ok: false, message: "Error interno del servidor" });
});

// Configuración del puerto
const PORT = process.env.PORT || 4000;


// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app; 