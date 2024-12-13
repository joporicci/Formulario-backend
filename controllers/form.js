import Business from '../models/business.js';
import { formSchema } from '../schema/formSchema.js';
import User from '../models/user.js';
import { uploadFileToGCS } from './upload.js';
import { sendMail } from './sendmail.js';


export const createBusiness = async (req, res) => {
  try {

    // Parsear objetos JSON enviados desde el frontend (ya booleanos)
    const paymentMethods = JSON.parse(req.body.paymentMethods || '{}');
    const general = JSON.parse(req.body.general || '{}');
    const accessibility = JSON.parse(req.body.accessibility || '{}');
    const gastronomy = JSON.parse(req.body.gastronomy || '{}');
    const connectivity = JSON.parse(req.body.connectivity || '{}');
    const additional = JSON.parse(req.body.additional || '{}');
    const location = JSON.parse(req.body.location || '{}');
    
    // Subir archivos (portada y galería)
    let coverPhotoUrl = null;
    if (req.files?.coverPhoto && req.files.coverPhoto[0]) {
    //  coverPhotoUrl = await uploadFileToGCS(req.files.coverPhoto[0]);
     coverPhotoUrl = process.env.UPLOADS_URL + req.files.coverPhoto[0].filename;
    }

    let galleryUrls = [];
    if (req.files?.gallery) {
      // const galleryUploads = req.files.gallery.map((file) => uploadFileToGCS(file));
      // galleryUrls = await Promise.all(galleryUploads);
      galleryUrls = req.files.gallery.map((file) => process.env.UPLOADS_URL + file.filename);
    }
    delete req.body.coverPhoto;
    delete req.body.gallery;
    // Validar datos usando Joi
    const { error } = formSchema.validate(
      {
        ...req.body,
        paymentMethods,
        general,
        accessibility,
        gastronomy,
        connectivity,
        additional,
        location,
      },
      { abortEarly: false }
    );

    if (error) {
      console.log("ERROR",error);
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
      fantasyName: req.body.fantasyName,
      category: req.body.category,
      subcategory: req.body.subcategory,
      description: req.body.description,
      schedule: req.body.schedule,
      phone: req.body.phone,
      web: req.body.web || null,
      instagram: req.body.instagram || null,
      paymentMethods,
      general,
      accessibility,
      gastronomy,
      connectivity,
      additional,
      location,
      coverPhoto: coverPhotoUrl || null,
      gallery: galleryUrls,
   //   createdBy: req.user_id,
      createdBy: '674c93b72a7f4cf7a1ba162a',
    };

    const newBusiness = new Business(businessData);
    await newBusiness.save();

    await sendMail(businessData); // Llamo la función antes de guardar los datos del usuario.
    const foundUser = await User.findById(req.user_id);
    if (foundUser) {
      foundUser.logged = true;
      await foundUser.save();
    }
    
    // Limpiamos cookie de sesión si es necesario
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
      maxAge: 1,
    });

    
    
    return res.status(201).json({ message: "Registraste tu negocio exitosamente", business: newBusiness });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({ message: "Error interno", error: error.message });
  }
};
