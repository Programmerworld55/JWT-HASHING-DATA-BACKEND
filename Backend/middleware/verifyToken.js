const jwt = require('jsonwebtoken');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization);

    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from "Authorization: Bearer <token>"
    
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};  
module.exports=verifyToken