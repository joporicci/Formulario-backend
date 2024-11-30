import User from "../models/user.js";
import Admin from "../models/admin.js";
import bcrypt from "bcrypt";

// FALTA CREAR LAS VISTAS EN EL FRONTEND
export const createUser = async (req,res)=>{

    try{
        const {username,password}=req.body;

        // VERIFICO QUE HAYAN DATOS 
        if(!username||!password){
            return res.status(401).json({message:"Error. Falta de datos"});
        }
        // SI ENCUENTRO EL USUARIO RETORNO
        const foundUser = await User.findOne({username});

        if(foundUser){
            return res.status(401).json({message:"Este usuario ya existe en la base de datos"});
        }

        // HASHEO LA CONTRASEÑA
        const hashedPassword = await bcrypt.hash(password,10)

        const user =  new User ({
            username,
            password:hashedPassword,
            logged:false,
            wrongtries:0,
        });

        // ALMACENO EL USUARIO CON CONTRASEÑA ENCRIPTADA
        await user.save();
        return res.status(201).json({message:"Usuario creado correctamente"});

    }catch(error){
        console.error("Error",error);
        return res.status(500).json({message:"Error del servidor"})
    }
}

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Validación de entrada
      if (!username || !password) {
        return res.status(401).json({ message: "Error por falta de datos" });
      }
  
      // Buscar al administrador en la base de datos
      const foundAdmin = await Admin.findOne({ username });
  
      // Si no encuentra el administrador
      if (!foundAdmin) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
  
      // Validar contraseña
      const isValidPassword = await bcrypt.compare(password, foundAdmin.password);
  
      if (!isValidPassword) {
        foundAdmin.wrongtries += 1;
  
        // Bloquear si supera el límite de intentos
        if (foundAdmin.wrongtries >= 20) {
          foundAdmin.lockeduntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
          await foundAdmin.save();
          return res.status(403).json({
            message: "Supera el límite de intentos permitidos. Intenta más tarde.",
          });
        }
  
        await foundAdmin.save();
        return res.status(401).json({ message: "Error: credenciales inválidas" });
      }
  
      // Restablecer intentos fallidos al autenticarse correctamente
      foundAdmin.wrongtries = 0;
      await foundAdmin.save();
  
      // Crear un token JWT
      const token = await createToken({
        id: foundAdmin._id,
        username: foundAdmin.username,
      });
  
      // Enviar la cookie con el token
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 día
      });
  
      return res.status(200).json({
        id: foundAdmin._id,
        username: foundAdmin.username,
      });
    } catch (error) {
      console.error("ERROR", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  };