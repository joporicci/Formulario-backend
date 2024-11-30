import Business from '../models/business.js';
import { formSchema } from '../schema/formSchema.js';
import User from '../models/user.js';

export const createBusiness = async (req, res) => {
  try {
    console.log(req.body);
    // Parsear objetos JSON
    const paymentMethods = JSON.parse(req.body.paymentMethods || '{}');
    const location = JSON.parse(req.body.location || '{}');

    // Validar datos
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

    // Procesar imágenes
    const coverPhoto = req.files.coverPhoto
      ? `/uploads/${req.files.coverPhoto[0].filename}`
      : null;
    const gallery = req.files.gallery
      ? req.files.gallery.map((file) => `/uploads/${file.filename}`)
      : [];

    // Preparar datos para guardar
    const businessData = {
      ...req.body,
      paymentMethods,
      location,
      coverPhoto,
      gallery,
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

    res.status(201).json({ message: 'Negocio creado exitosamente', business: newBusiness });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).json({ message: 'Error interno', error: error.message });
  }
};
