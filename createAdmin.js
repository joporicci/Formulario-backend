import mongoose from "mongoose";
import Admin from "./models/admin.js"; // Ruta de tu modelo Admin
import bcrypt from "bcrypt";
import { connectDB } from "./config/connectdb.js";

const createAdmin = async () => {
  try {

    const username = "MiguelLopez";
    const password = "Vend2**CU26";
    await connectDB ();
    

    // Verificar si el usuario ya existe
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("El usuario ya existe");
      return;
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario administrador
    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();
    console.log("Usuario administrador creado con éxito");
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error.message);
  } finally {
    console.log('finalizado');
    mongoose.connection.close();
  }
};

createAdmin();
