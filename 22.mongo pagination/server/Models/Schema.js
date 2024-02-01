const mongoose = require('mongoose');

const kk = new mongoose.Schema({
    name: { type: String},
    num: { type: Number },
})

const ff = mongoose.model("pages", kk)

module.exports=ff;
