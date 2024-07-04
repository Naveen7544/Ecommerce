const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(403).send({ message: "No token provided" });
    }

    // Ensure the token is in the format "Bearer <token>"
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Debugging log

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err); 
            return res.status(500).send({ message: "Failed to authenticate token" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
