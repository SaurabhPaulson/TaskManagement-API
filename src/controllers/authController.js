const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields required' });
        }
        const existing = await User.findByUsername(username);
        if (existing) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const user = await User.createUser({ username, password, role });
        res.status(201).json({ user });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
