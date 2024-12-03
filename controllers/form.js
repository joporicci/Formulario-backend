import Business from '../models/business.js';
import { formSchema } from '../schema/formSchema.js';
import User from '../models/user.js';
import { uploadFileToGCS } from './upload.js';


export const createBusiness = async (req, res) => {
  try {
    console.log(req.body);
    // Parsear objetos JSON
    const paymentMethods = JSON.parse(req.body.paymentMethods || '{}');
    const location = JSON.parse(req.body.location || '{}');

    // Validar datos

    let coverPhotoUrl = null; 
    if (req.files.coverPhoto && req.files.coverPhoto[0]){
      try{
        coverPhotoUrl= await uploadFileToGCS(req.files.coverPhoto[0]);
      }
      catch(err){
        console.error('Error al subir la foto',err.message);
        return res.status(500).json({message:"Error al subir la foto de portada",error:err.message})
      }
    }
      
    let galleryUrls=[]; 
    if(req.files.gallery){
      try{
        const galleryUploads = req.files.gallery.map((file)=>uploadFileToGCS(file));
        galleryUrls = await Promise.all(galleryUploads);
      }
      catch (err) {
        console.error('Error al subir las fotos de la galería:', err.message);
        return res.status(500).json({ message: 'Error al subir las fotos de la galería', error: err.message });
      }
    }
    const { error } = formSchema.validate(
      {
        ...req.body,
        paymentMethods,
        location,
      },
      { abortEarly: false }
    );

    
    if (error) {
      return res.status(400).json({
        message: "Errores de validación",
        errors: error.details.map((err) => ({
          field: err.context.key,
          message: err.message,
        })),
      });
    }

    
    // Preparar datos para guardar
    const businessData = {
      ...req.body,
      paymentMethods,
      location,
      coverPhoto:coverPhotoUrl ||null,// Unica Url
      gallery:galleryUrls.length >0 ? galleryUrls:[], // Arreglo de urls
      createdBy: req.user_id,
    };

    // Guardar en MongoDB
    const newBusiness = new Business(businessData);
    await newBusiness.save();

    const foundUser = await User.findById(req.user_id);

    if (foundUser) {
      console.log(foundUser);
      foundUser.logged = true;
      await foundUser.save();
    }
    res.clearCookie('token', { path: '/' });
    res.status(201).json({ message: 'Negocio creado exitosamente', business: newBusiness });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).json({ message: 'Error interno', error: error.message });
  }
};
