import rateLimit from 'express-rate-limit';

// Limitar intentos por IP
const Limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max:100, // Limite de 100 intentos
  message: 'Demasiados intentos de inicio de sesión desde esta IP. Intente de nuevo más tarde.',
  keyGenerator: (req) => req.ip,
});

export default Limiter;
