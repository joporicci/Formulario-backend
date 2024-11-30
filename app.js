import express from "express"
import cors from "cors"
import ExpressMongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import  {connectDB} from "./config/connectdb.js"
import dotenv from "dotenv"
import loginRouter from "./routes/auth.js"
import formRouter from "./routes/form.js"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from "./models/user.js" // Ajusta la ruta según tu estructura



dotenv.config();
await connectDB()

console.log('Empezando el setup.');


const app = express();

app.use(express.json());
app.use(
    cors({
        origin: `${process.env.FRONTEND_URL}`,
        credentials: true,
    })
);
app.disable('x-powered-by');
app.use(ExpressMongoSanitize());
app.use(helmet());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//RUTAS .......................... ///////////

app.use('/auth',loginRouter)
app.use('/api',formRouter)



// RUTAS ......................... //////////

// MANEJO DE ERRORES EN LA PILA DEL PROGRAMA //////
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ ok: false, message: 'Error!' });
    next();
});
/// MANEJO DE ERRORES EN LA PILA DEL PROGRAMA /////////////

const PORT = process.env.PORT ||4000

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})



