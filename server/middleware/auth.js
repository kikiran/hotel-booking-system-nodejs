const { users } = require('../data/mockData');

const tokens = {};

function generateToken(userId) {
  const token = Buffer.from(`${userId}-${Date.now()}-${Math.random().toString(36)}`).toString('base64');
  tokens[token] = userId;
  return token;
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const userId = tokens[token];

  if (!userId) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
  next();
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const userId = tokens[token];
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    }
  }
  next();
}

function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Admin access required' });
  }
}

module.exports = { generateToken, authMiddleware, optionalAuth, adminOnly };
