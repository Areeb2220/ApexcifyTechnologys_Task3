const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword, compare } = require('../utils/hash');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'change_this_super_secret';
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '1h';


// Register (open)
router.post('/register', async (req, res) => {
try {
const { name, email, password, role } = req.body;
if(!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
const existing = await User.findOne({ email });
if(existing) return res.status(400).json({ message: 'Email already used' });
const passwordHash = await hashPassword(password);
const user = await User.create({ name, email, passwordHash, role });
const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if(!email || !password) return res.status(400).json({ message: 'Missing fields' });
const user = await User.findOne({ email });
if(!user) return res.status(400).json({ message: 'Invalid credentials' });
const ok = await compare(password, user.passwordHash);
if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;