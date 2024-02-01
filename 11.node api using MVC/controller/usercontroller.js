const ct = require('../config/sql-config');
const jwt = require('jsonwebtoken');
const jwtkey = 'test';
const upload = require('../middleware/imageupload');
const bcrypt = require('bcrypt');


exports.login_user = async (req, resp) => {
    if (req.body.email && req.body.password) {
        data = [req.body.email];

        ct.query('select email,password from userdata where email = ? ', data, async (err, result, field) => {
            if (err) throw err;
            else {
                const checkpassword = await bcrypt.compare(req.body.password, result[0].password)
                console.log(checkpassword);
                if (checkpassword) {
                    jwt.sign({ result }, jwtkey, { expiresIn: "8h" }, (err, token) => {
                        resp.json({
                            status_code: 200,
                            auth: token,
                            message: "Login Successfully"
                        })
                    })
                } else {
                    resp.status(401).json({ msg: "wrong credientials" })
                }
            }
        })
    } else {
        resp.send([])
    }
}


exports.user_delete = (req, res) => {
    ct.query(`delete from userdata where id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
    })
}

exports.get_user = (req, resp) => {
    ct.query("select * from userdata", (err, res, field) => {
        if (res) {
            resp.send(res)
            // console.log(field);
        }
    })
}

exports.add_user = async (req, resp) => {
    const hashcode = await bcrypt.hash(req.body.password, 10);
    data = [
        req.body.firstName,
        req.body.lastName,
        req.body.phonenumber,
        req.body.email,
        hashcode,
    ]
    ct.query('insert into userdata SET firstName = ?,lastName = ?,phonenumber = ?,email = ?,password = ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            jwt.sign({ result }, jwtkey, { expiresIn: "8h" }, (err, token) => {
                resp.json({ msg: "user added successfully" })
            })
        }
    })
}




exports.update_user = (req, resp) => {
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
}

exports.get_pic = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(err)
        } else {
            console.log(req.files);
            res.send("success")
        }
    })
}

// module.exports={
//     user_delete,
//     get_user,
//     add_user,
//     update_user
// }