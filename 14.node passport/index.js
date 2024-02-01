const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtkey = 'test';
const ct = require('./config');
const app = express()

const passport = require('passport');
const pass = require('./jwrpass')


app.use(passport.initialize())
app.use(express.json())
app.use(cors())

pass(passport)

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



app.get('/getdata', verifytoken, (req, resp) => {
    ct.query("select * from userdata", (err, res, field) => {
        if (res) {
            resp.send(res)
            // console.log(field);
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

app.get('/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send("sucess")
})

app.listen(8888)
