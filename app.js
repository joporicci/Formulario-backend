import express from "express";
import cors from "cors";

import helmet from "helmet";
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
app.use(express.json({ limit: "10kb" })); // Limita el tamaño del body a 10 KB
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // URL del frontend
    credentials: true, // Permite enviar cookies en solicitudes
  })
);



app.use(ExpressMongoSanitize())
// Rate limiting
app.use(Limiter); // Middleware para limitar solicitudes

// Configuración para archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Servir archivos estáticos

// Rutas
app.use("/auth", loginRouter);
app.use("/api", formRouter);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ ok: false, message: "Ruta no encontrada" });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack); // Registro del error en consola
  res.status(500).json({ ok: false, message: "Error interno del servidor" });
});

// Configuración del puerto
const PORT = process.env.PORT || 4000;


// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app; 