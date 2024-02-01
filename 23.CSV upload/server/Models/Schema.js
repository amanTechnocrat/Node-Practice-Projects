const mongoose = require('mongoose');

const kk = new mongoose.Schema({
    "Serial Number": { type: String },
    "Company Name": { type: String },
    "Employee Markme": { type: String },
    "Description": { type: String },
    "Leave": { type: String }
})

const ff = mongoose.model("data", kk)

module.exports = ff;
