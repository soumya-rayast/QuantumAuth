const jwt = require('jsonwebtoken');

// environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'sefjhnjk';

// function to generate a JWT Token 
const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
// function to verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        }
        throw new Error('Token is invalid');
    }
};
module.exports = { generateToken, verifyToken }
