const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
role: { type: String, enum: ['admin','trainer','member'], default: 'member' },
phone: String,
createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('User', UserSchema);