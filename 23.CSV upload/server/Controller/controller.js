const csvtojson = require('csvtojson');
const multer = require('multer');
const col = require('../Models/Schema');
const sheetToJson = require('csv-xlsx-to-json');

const dest = multer({
    storage: multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
}).single('csv')

const c2j = async (path) => {
    let res = await csvtojson().fromFile(path)
    return res
}
const s2j = (path) => {
   return sheetToJson.process(path);
}

exports.readcsv = async (req, res) => {
    try {
        let arr = []
        dest(req, res, async (err) => {
            // let json = await c2j(req.file.path)
           let cc =  s2j(req.file.path)

            // json.forEach((val) => {
            //     // let data = new col(val).save()
            //     arr.push(val)
            // })
            // res.json("success")
            // for (const key of arr) {
            //     console.log(key);
            // data = {
            //     "Serial Number": key.SerialNo,
            //     "Company Name": key.CompanyName,
            //     "Employee Markme": key.EmployeeMarkme,
            //     "Description": key.Description,
            //     "Leave": key.Leave
            // }
            // new col(data).save()
            // }
        })
    } catch (error) {
        res.json(error)
    }
};