const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  
  // Verifica se o token foi fornecido
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    // Remove o prefixo 'Bearer ' do token, se existir
    const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    // Valida o token JWT
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Adiciona as informações decodificadas ao objeto req
    req.user = decoded;
    next(); // Permite que a requisição continue para a próxima etapa
  } catch (error) {
    // Diferencia os tipos de erro
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido' });
    }
    return res.status(403).json({ message: 'Erro ao validar o token' });
  }
};

module.exports = authenticateUser;
