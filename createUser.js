import mongoose from "mongoose";
import User from "./models/user.js"; // Ruta de tu modelo Admin
import bcrypt from "bcrypt";
import { connectDB } from "./config/connectdb.js";

const createUser = async () => {
  try {

    const username = "Cotel";
    const password = "Cot3lvg**.";
    await connectDB ();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("El usuario ya existe");
      return;
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario administrador
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    console.log("Usuario  creado con éxito");
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error.message);
  } finally {
    console.log('finalizado');
    mongoose.connection.close();
  }
};

createUser();
