import Business from "../models/business";
import User from "../models/user";

// Elimino usuarios que esten en la base de datos. Ya sea que hayan enviado información o no.

const deleteBusiness = async (req,res)=>{
   const userId = req.user._id; 
   try{
    // Validar que quiere eliminar un ssu propio usuario un usuario registrado 
    const foundUser =  await User.findOne(userId);
    if(!foundUser){
        return res.status(401).json({message:"Desautorizado. El usuario no existe"});
    } 

    const foundBusiness= await  Business.findOne(userId);

    if(!foundBusiness){
        await foundUser.deleteOne();
    }
    await foundBusiness.deleteOne();
    await foundUser.deleteOne(); 

    return res.status(200).json({message:"Eliminación exitosa"});

   }catch(err){
    console.error("Error",err);
    return res.status(500).json("ERROR DEL SERVIDOR");
   }
}

export default deleteBusiness;