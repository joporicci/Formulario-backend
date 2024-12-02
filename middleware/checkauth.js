 import jwt from "jsonwebtoken";
 
 const authenticate = (req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Raw Headers:', req.rawHeaders);
  
  const cookieHeader = req.headers.cookie;
  console.log('Cookies:', cookieHeader);
  
  if (!cookieHeader) {
    return res.status(401).json({ message: 'No autenticado - Falta cookie' });
  }

  const token = cookieHeader.split('token=')[1];
  if (!token) {
    return res.status(401).json({ message: 'No autenticado - Token no encontrado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user_id = decoded.id;
    console.log('Token válido, user ID:', req.user_id);
    next();
  } catch (error) {
    console.error('Error de token:', error.message);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

export default authenticate;