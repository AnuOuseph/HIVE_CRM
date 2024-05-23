const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    maritalStatus: {
        type: String,
    },
    dob: {
        type: Date,
    },
    age: {
        type: String,
    },
    email: {
        type: String,
    },
    number: {
        type: String,
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
    },
    passport: {
        type: String,
    },
    expiryDate: {
        type: Date,
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    mailAddress: {
        type: String,
    },
    mailState: {
        type: String,
    },
    mailCity: {
        type: String,
    },
    mailPinCode: {
        type: String,
    },
    emName: {
        type: String,
    },
    emContact: {
        type: String,
    },
    emEmail: {
        type: String,
    },
    emRelation: {
        type: String,
    },
    emAddress: {
        type: String,
    },
    sslc: {
        type: String,
    },
    plusTwo: {
        type: String,
    },
    diploma: {
        type: String,
    },
    ug: {
        type: String,
    },
    pg: {
        type: String,
    },
    highestEducation: {
        type: String,
    },
    ielts: {
        type: String,
    },
    graduation: {
        type: String,
    },
    backlogs: {
        type: String,
    },
    gap: {
        type: String,
    },
    workExperience: {
        type: String,
    },
    visaRefusal: {
        type: String,
    },
    preCountry: {
        type: String,
    },
    preProgram: {
        type: String,
    },
    preIntake: {
        type: String,
    },
    courseDuration: {
        type: String,
    },
    preEducation: {
        type: String,
    },
    preInstitution: {
        type: String,
    },
    leadSource: {
        type: String,
    },
    leadStage: {
        type: String,
        default: "T3",
    },
    leadStatus: {
        type: String,
    },
    leadAssigned: {
        type: String,
    },
    comments: {
        type: String,
    },
    followUps: {
        type: Number,
        default: 0
    },
    lastFollowed: {
        type: Date
    },
    firstPayment: {
        type: Number,
    },
    secondPayment: {
        type: Number,
    },
    documents: {
        type: Array,
    }
},{
    timestamps: true
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;