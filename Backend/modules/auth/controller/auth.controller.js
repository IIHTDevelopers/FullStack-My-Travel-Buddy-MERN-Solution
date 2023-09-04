const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../user/dao/models/user.model');
const SECRET_KEY = 'your-secret-key';

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Authentication failed. User not found.' });
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Authentication failed. Incorrect password.' });
            }
            const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Failed to authenticate user.' });
        }
    }

    async changePassword(req, res) {
        try {
            const { userId, newPassword } = req.body;
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate(userId, { password: hashedPassword });
            res.json({ message: 'Password changed successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to change password.' });
        }
    }
}

module.exports = AuthController;
