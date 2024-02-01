const mongoose = require('mongoose');

const student = new mongoose.Schema({
    name: { type: String},
    num: { type: Number },
    date:{ type: mongoose.Mixed}
})
const xi = mongoose.model("student", student)

const category = new mongoose.Schema({
    catname: { type: String},
    studentid:{ type: String}
}) 

const lxi = mongoose.model("Category", category)

const studentclass = new mongoose.Schema({
    num: { type: String , ref: xi },
    class:{type:String},
    third:{ type: String, ref: lxi}
})

const xxi = mongoose.model("class", studentclass)

module.exports = { xi, xxi,lxi };