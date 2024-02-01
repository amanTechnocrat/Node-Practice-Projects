const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtkey = 'test';
const ct = require('./config');
const app = express()

app.use(express.json())
app.use(cors())


const verifytoken = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.send("error")
            } else {
                next()
            }
        })
    } else {
        res.status(401).send("invalid req")
    }
}

app.get('/', (req, resp) => {
    ct.query("select * from brands", (err, res, field) => {
        if (res) {
            resp.send(res)
            // console.log(field);
        }
    })
})

app.get('/getdata', verifytoken, (req, resp) => {
    ct.query("select * from userdata", (err, res, field) => {
        if (res) {
            resp.send(res)
            // console.log(field);
        }
    })
})


app.post('/add', (req, resp) => {
    // data={"name":"p&g"}
    data = req.body;
    ct.query('insert into brands SET ?', data, (err, result, field) => {
        if (result) {
            resp.send(result)
        }
    })
})

app.post('/adduser', (req, resp) => {
    // data={"name":"p&g"}
    data = req.body;
    ct.query('insert into userdata SET ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            jwt.sign({ result }, jwtkey, { expiresIn: "8h" }, (err, token) => {
                resp.send({ result, auth: token })
            })
        }
    })
})

app.post('/login', (req, resp) => {

    if (req.body.email && req.body.password) {
        data = [req.body.email, req.body.password];
        ct.query('select email,password from userdata where email = ? and password = ?', data, (err, result, field) => {
            if (err) throw err;
            else {
                jwt.sign({ result }, jwtkey, { expiresIn: "8h" }, (err, token) => {
                    resp.send({ result, auth: token })
                })
            }
        })
    } else {
        resp.send([])
    }
})

app.put('/:id', (req, resp) => {

    data = [req.body.name, req.params.id]
    ct.query('update brands set name =? where id = ?', data, (err, result, field) => {
        if (result) {
            resp.send(result)
        }
    })
})

app.delete('/:id', (req, res) => {
    ct.query(`delete from brands where id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
    })
})

app.delete('/deleteuser/:id', verifytoken, (req, res) => {
    ct.query(`delete from userdata where id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
    })
})

app.put('/updateuser/:id',verifytoken ,(req, resp) => {

    data = [
        req.body.firstName,
        req.body.lastName,
        req.body.phonenumber,
        req.body.email,
        req.body.password,
        req.params.id
    ]
    
    ct.query('update userdata set firstName = ?,lastName = ?,phonenumber = ?,email = ?,password = ? where id = ?', data, (err, result, field) => {
        if (result) {
            resp.send(result)
        }
    })
})

app.listen(8888)

// ct.query("select name from brands",(err,res)=>{
//     console.log(res);
// })