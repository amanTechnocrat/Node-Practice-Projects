const { ObjectID } = require("bson");
const express = require("express");
const dbconnect = require('./config');
const app = express();

app.use(express.json());

app.get('/show', async (req, res) => {
    let mk = await dbconnect();
    let data = await mk.find().toArray();
    res.json(data)
})

app.post('/add', async (req, res) => {
    let mk = await dbconnect();
    let data = await mk.insertOne({ name: `${req.body.name}` });
    res.json(data)
})

app.put('/update/:name', async (req, res) => {
    let mk = await dbconnect();
    let data = await mk.updateOne({ name: `${req.params.name}` }, { $set: { name: `${req.body.name}` } })
    res.json(data)
})

app.delete('/remove/:id', async (req, res) => {
    let mk = await dbconnect();
    let data = await mk.deleteOne({ "_id": ObjectID(`${req.params.id}`) })
    res.json(data)
})

app.listen(8888);
