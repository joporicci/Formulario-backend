import Joi from "joi";
export const formSchema = Joi.object({
  category: Joi.string()
  .min(3)
  .max(250)
  .required()
  .messages({
    "string.empty": "El campo 'Rubro' no puede estar vacío.",
    "string.min": "El campo 'Rubro' debe tener al menos 3 caracteres.",
    "string.max":"El campo 'Rubro' debe tener un máximo de 250 caracteres",
    "any.required": "El campo 'Rubro' es obligatorio.",
  }),
subcategory: Joi.string()
  .min(3)
  .max(250)
  .required()
  .messages({
    "string.empty": "El campo 'Subrubro' no puede estar vacío.",
    "string.min": "El campo 'Subrubro' debe tener al menos 3 caracteres.",
    "string.max":"El campo 'Subrubro' debe tener un máximo de 250 caracteres",
    "any.required": "El campo 'Subrubro' es obligatorio.",
  }),
description: Joi.string()
  .min(10)
  .max(2500)
  .messages({
    "string.min": "La descripción debe tener al menos 10 caracteres.",
    "string.max":"La descripción debe tener un máximos de 2500 caracteres."
  }),
  paymentMethods: Joi.object({
    efectivo: Joi.string().valid('Sí', 'No').required(),
    transferencia: Joi.string().valid('Sí', 'No').required(),
    credito: Joi.string().valid('Sí', 'No').required(),
    debito: Joi.string().valid('Sí', 'No').required(),
  }).required(),
  accessibility: Joi.string().valid('Sí', 'No').required(),
  wifi: Joi.string().valid('Sí', 'No').required(),
  acceptsPets: Joi.string().valid('Sí', 'No').required(),
  parking: Joi.string().valid('Sí', 'No').required(),
  schedule: Joi.string().min(5).required(),
  location: Joi.object({
    city: Joi.string().min(2).required().messages({
      "string.empty": "El campo 'Localidad' no puede estar vacío.",
      "string.min": "La localidad debe tener al menos 2 caracteres.",
      "any.required": "El campo 'Localidad' es obligatorio.",
    }),
    street: Joi.string().min(2).max(200).required().messages({
      "string.empty": "El campo 'Calle' no puede estar vacío.",
      "string.min": "La  calle debe tener al menos 2 caracteres.",
      "any.required": "El campo 'Calle' es obligatorio.",
    }),
    number: Joi.string().min(1).max(6).required().messages({
      "string.empty": "El campo 'Numero' no puede estar vacío.",
      "string.min": "el núnero debe tener al menos 1 caracter.",
      "any.required": "El campo 'Número' es obligatorio.",
    })
  }),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).required(),
  web: Joi.string().uri().allow(null, ''),
  instagram: Joi.string().uri().allow(null, ''),
});
