const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;