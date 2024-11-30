const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',  // default status is active
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;