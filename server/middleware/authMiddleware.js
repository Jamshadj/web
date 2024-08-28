const { verifyToken } = require('../utils/tokenUtils');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ err: true, message: 'Unauthorized' });
    }
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ err: true, message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
