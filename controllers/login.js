import User from "../models/user.js"
import createToken from "../libs/createtoken.js";
import bcrypt from "bcrypt";
import { loginSchema } from "../schema/loginSchema.js";


export const loginUser = async (req, res) => {

    console.log("Entra");
    const { username, password } = req.body;

  
    try {
       
      const foundUser = await User.findOne({ username });
  
      // NO ENCUENTRA EL USUARIO EN LA DB
      if (!foundUser) { 
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Credenciales inválidas' });
      }
      // EL USUARIO ENVIÓ EL FORMULARIO // LOGGED = TRUE 
      if (foundUser.logged){ 
        return res.status(401).json({message:"Usted ya ha registrado su negocio"});
      }
      // EL USUARIO ESTÁ BLOQUEADO POR INTENTOS INCORRECTOS
      if (foundUser.lockeduntil && foundUser.lockeduntil > new Date()){
        return res.status(403).json({
          message: `Usuario bloqueado hasta ${foundUser.lockeduntil.toLocaleString()}.`,
        });    
      }
      // CONTRASEÑA INCORRECTA // SUMO INTENTOS INCORRECTOS Y EVALUO SI BLOQUEO O NO

      console.log(foundUser.password)
      const isValidPassword = await bcrypt.compare(password,foundUser.password);
      if(!isValidPassword){
        foundUser.wrongtries+=1;

        if(foundUser.wrongtries>=20){
          foundUser.lockeduntil = new Date(Date.now()+60*60*1000);
          await foundUser.save();
          return res.status(403).json({message:"Usuario bloqueado por multiples intentos fallidos"});
        }
        await foundUser.save();
        return res.status(401).json({message:"Error credenciales invalidas"});
      }

      console.log('Usuario autenticado correctamente');
      foundUser.wrongtries = 0;
      await foundUser.save();
      const token = await createToken({id:foundUser._id},{username:foundUser.username})
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({
        id: foundUser._id,
        username: foundUser.username,
      });
  
      // Continuar con el resto del flujo...
    } catch (error) {
      console.error('Error en loginUser:', error.message);
      res.status(500).json({ message: 'ERR_SERVER_ERROR' });
    }
  };
  export const logout = async (req, res) => {
    try {
      // Invalidar la cookie del token
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });
  
      return res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
    }
  };