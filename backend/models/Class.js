const mongoose = require('mongoose');


const ClassSchema = new mongoose.Schema({
    title: String,
    description: String,
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    capacity: Number,
    startTime: Date,
    endTime: Date,
    location: String,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Class', ClassSchema);