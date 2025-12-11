const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const ClassModel = require('../models/Class');
const User = require('../models/User');
const auth = require('../middleware/auth');


// Mark attendance manually
// Roles allowed: trainer, admin (trainers/admins mark members' attendance)
// Body: { memberId, classId }
router.post('/mark', auth(['trainer', 'admin']), async (req, res) => {
    try {
        const { memberId, classId } = req.body;
        if (!memberId || !classId) return res.status(400).json({ message: 'memberId and classId required' });


        const user = await User.findById(memberId);
        if (!user) return res.status(404).json({ message: 'Member not found' });


        const cls = await ClassModel.findById(classId);
        if (!cls) return res.status(404).json({ message: 'Class not found' });


        // Optionally verify that the member is enrolled
        // if(!cls.attendees.includes(memberId)) return res.status(400).json({ message: 'Member not enrolled in class' });


        const att = await Attendance.create({ user: memberId, class: classId, markedBy: req.user.id, method: 'manual' });
        res.json({ message: 'Attendance marked', attendance: att });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get attendance records (filter by user or class)
router.get('/', auth(), async (req, res) => {
    try {
        const { user: userId, class: classId } = req.query;
        const q = {};
        if (userId) q.user = userId;
        if (classId) q.class = classId;
        const list = await Attendance.find(q).populate('user', 'name email').populate('class', 'title startTime');
        res.json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;