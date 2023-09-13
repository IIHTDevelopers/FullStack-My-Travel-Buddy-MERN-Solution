const jwt = require('jsonwebtoken');
const User = require('../../user/dao/models/user.model');
const SECRET_KEY = 'your-secret-key';

async function authGuard(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ error: 'Access denied. User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Access denied. Invalid token.' });
    }
}

module.exports = authGuard;
