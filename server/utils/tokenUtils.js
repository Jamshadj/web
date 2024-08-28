const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'jerhfbi38hrf34urh89he9j12iu'; // Use environment variable

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };
