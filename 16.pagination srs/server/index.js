const express = require('express');
const cors = require('cors');
const ct = require('./config');
const app = express()

app.use(express.json())
app.use(cors())

app.post('/get', (req, res) => {
    // console.log(req.body);
    let from  = req.body.stfrom
    let pagesize = req.body.pagesize
    ct.query(`select * from page`,(err, result, field) => {
        if (err) throw err;
        const total = result.length

        ct.query(`select * from page where id > ${from} order by id limit ${pagesize}`,(err, result2, field) => {
            if (err) throw err;
            res.status(200).json({list:result2,total})
        })
    })

})



app.listen(8888)
