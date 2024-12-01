import rateLimit from 'express-rate-limit';

// Limitar intentos por IP
const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max:50, // Limite de 5 intentos
  message: 'Demasiados intentos de inicio de sesión desde esta IP. Intente de nuevo más tarde.',
});

export default Limiter;
