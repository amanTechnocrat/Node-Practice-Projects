const mongoose = require('mongoose');

const kk = new mongoose.Schema({
    "email": { type: String },
    "password": { type: String },
    "otpcode": { type: String }
})

const schema = mongoose.model("test", kk)

module.exports = schema;