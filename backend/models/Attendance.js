const mongoose = require('mongoose');


const AttendanceSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
method: { type: String, enum: ['manual'], default: 'manual' },
timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Attendance', AttendanceSchema);