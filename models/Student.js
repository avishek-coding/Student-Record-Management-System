const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    idString: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: { type: String, required: true },
    phone: { type: String },
    feeDue: { type: Number, default: 0 },
    lastFeePaid: Date
});

module.exports = mongoose.model('Student', studentSchema);