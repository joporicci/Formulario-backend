import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const headers = req.rawHeaders;
  console.log("antes");
  const cookie = headers.find((element) => element.includes('token='));
  console.log(cookie);
  console.log(headers);
  if (!cookie) {
      return res.status(401).json({
          isAuthenticated: false,
          user: null,
      });
  }
  const token = cookie.split('=')[1];
  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET); // Verificar token con la clave secreta
    req.user_id = decoded.id; // Adjuntar el ID del usuario al objeto `req`
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

export default authenticate;
