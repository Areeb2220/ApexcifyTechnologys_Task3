const express = require('express');
const router = express.Router();
const ClassModel = require('../models/Class');
const auth = require('../middleware/auth');


// Create class (trainer or admin)
router.post('/', auth(['trainer', 'admin']), async (req, res) => {
    try {
        const payload = req.body;
        payload.trainer = req.user.id; // whoever creates becomes trainer by default
        const c = await ClassModel.create(payload);
        res.json(c);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get all classes
router.get('/', auth(), async (req, res) => {
    try {
        const list = await ClassModel.find().populate('trainer', 'name email');
        res.json(list);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Enroll: optional - member enrolls in class
router.post('/:id/enroll', auth(['member']), async (req, res) => {
    try {
        const cls = await ClassModel.findById(req.params.id);
        if (!cls) return res.status(404).json({ message: 'Class not found' });
        if (cls.attendees.includes(req.user.id)) return res.status(400).json({ message: 'Already enrolled' });
        cls.attendees.push(req.user.id);
        await cls.save();
        res.json({ message: 'Enrolled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;