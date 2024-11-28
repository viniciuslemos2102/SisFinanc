// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, 'seu_segredo_jwt');
    req.user = decoded; // Adiciona as informações do usuário ao objeto req.
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authenticateUser;
