function verifyToken(req, res, next) {
    const token = "JWTToken";//req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
     //const decoded = jwt.verify(token, 'your-secret-key');
     req.userId = 123;//decoded.userId;
     next();
     } catch (error) {
     res.status(401).json({ error: 'Invalid token' });
     }
     };
    
    module.exports = verifyToken;