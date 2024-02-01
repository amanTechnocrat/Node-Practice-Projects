const express = require('express');
require('./config')
const col1 = require('./Schema').xi;
const col2 = require('./Schema').xxi;
const col3 = require('./Schema').lxi;
const app = express()
app.use(express.json())

app.post('/add', async (req, res) => {
    let a = new Date()
    let data = new col1({name:req.body.name,date:a,num:req.body.num})
    let result = await data.save()
    res.json(result)
})

app.post('/ref/:id', async (req, res) => {
    let data = new col2({num:req.params.id,class:`class${req.params.id}`})
    let result = await data.save()
    res.json(result)
})

app.post('/third/:id', async (req, res) => {
    let data = new col3({studentid:req.params.id,catname:`higher edu`})
    let result = await data.save()
    res.json(result)
})

app.get("/list", async (req, res) => {
    let data = await col2.find().populate("num third")
    res.json(data);
});

app.get("/search/:key", async (req, res) => {
    console.log(typeof req.params.key) 
    // let data = await col1.find({
    //     "$or": [
    //         { "name": { $regex: req.params.key } },
    //         {"date": {$regex: req.params.key}}
    //     ]
    // });
    let data = await col1.find({date :/req.params.key/})
    res.json(data);
});

app.delete("/delete/:_id", async (req, res) => {
    let deldata = await coll.deleteOne(req.params);
    res.json(deldata)
});

app.put("/update/:_id", async (req, res) => {
    let updatedata = await coll.updateOne(req.params, { $set: req.body });
    res.json(updatedata);
});

app.listen(9999)