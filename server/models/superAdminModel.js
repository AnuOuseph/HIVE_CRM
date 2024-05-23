const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "Super Admin",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    superAdmin: {
        type: Boolean,
        default: true,
    }
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

module.exports = SuperAdmin;