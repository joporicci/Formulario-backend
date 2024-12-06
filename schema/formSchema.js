

import Joi from 'joi';

export const formSchema = Joi.object({
  fantasyName: Joi.string().min(3).max(250).required(),
  category: Joi.string().min(3).max(250).required(),
  subcategory: Joi.string().min(3).max(250).required(),
  description: Joi.string().min(10).max(2500).allow(''),
  
  // Cada uno de estos objetos ahora es un objeto con propiedades booleanas
  paymentMethods: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  general: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  accessibility: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  gastronomy: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  connectivity: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  additional: Joi.object().pattern(Joi.string(), Joi.boolean()).required(),
  
  schedule: Joi.string().min(5).required(),
  location: Joi.object({
    city: Joi.string().min(2).required(),
    street: Joi.string().min(2).max(200).required(),
    number: Joi.string().min(1).max(6).required(),
  }).required(),
  
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).required(),
  web: Joi.string().uri().allow(null, ''),
  instagram: Joi.string().uri().allow(null, ''),
});