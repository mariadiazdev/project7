const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    //check user is only allowed to change their own uploads
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(403).json({ error: 'Invalid user ID' });
    } else {
      next();
    }
  
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};