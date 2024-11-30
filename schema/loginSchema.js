import Joi from "joi";
export const loginSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "El nombre de usuario debe ser un texto.",
      "string.empty": "El nombre de usuario es obligatorio.",
      "string.min": "El nombre de usuario debe tener al menos 3 caracteres.",
      "string.max":"El nombre de usuario debe tener un máximo de 100 caracteres",
      "any.required": "El nombre de usuario es obligatorio.",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un carácter especial.",
      "string.empty": "La contraseña es obligatoria.",
      "any.required": "La contraseña es obligatoria.",
    }),
});
