const ct = require('../config/sql-config');
const jwt = require('jsonwebtoken');
const jwtkey = 'test';

const bcrypt = require('bcrypt');


exports.login_user = async (req, resp) => {
    if (req.body.email && req.body.password) {
        data = [req.body.email];

        ct.query('select ID,email,password from bloguser where email = ? ', data, async (err, result, field) => {
            if (err) throw err;
            else if (!result.length > 0) {
                resp.status(200).json({ msg: "No account exists" })
            }
            else {
                const checkpassword = await bcrypt.compare(req.body.password, result[0].password)

                if (checkpassword) {
                    const refreshtoken = jwt.sign({ result }, "refresh", { expiresIn: "5d" })
                    jwt.sign({ result }, jwtkey, { expiresIn: "10s" }, (err, token) => {
                        resp.json({
                            status_code: 200,
                            auth: token,
                            refreshtoken,
                            message: "Login Successfully",
                            id: result[0].ID
                        })
                    })
                } else {
                    resp.status(200).json({ msg: "wrong credientials" })
                }
            }
        })
    } else {
        resp.send([])
    }
}


exports.user_delete = (req, res) => {
    ct.query(`delete from blogdb where id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
    })
}

exports.get_user = (req, resp) => {
    ct.query("select * from bloguser", (err, res, field) => {
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
        hashcode
    ]
    ct.query('insert into bloguser SET firstName = ?,lastName = ?,phonenumber = ?,email = ?,password = ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            jwt.sign({ result }, jwtkey, { expiresIn: "8h" }, (err, token) => {
                resp.json({ msg: "user added successfully" })
            })
        }
    })
}


exports.update_blog = (req, resp) => {

    data = [
        req.body.title,
        req.body.category,
        req.body.body,
        req.params.id
    ]

    ct.query('update blogdb set title = ?,category = ?,body = ? where id = ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            resp.send(result)
        }
    })
}

exports.add_blog = (req, res) => {
    data = [
        req.body.title,
        req.body.category,
        req.body.body,
        req.body.userid
    ]
    ct.query('insert into blogdb SET title = ?,category = ?,body = ?,userid = ?', data, (err, result, field) => {
        if (err) throw err;
        else {
            res.json({ msg: "blog added successfully" })
        }
    })
}

exports.get_blog = (req, res) => {
    ct.query("select * from blogdb", (err, result, field) => {
        if (result) {
            res.send(result)
        }
    })
}

exports.get_blogbyid = (req, res) => {
    ct.query("select * from blogdb where ID = ?", req.params.id, (err, result, field) => {
        if (result) {
            res.send(result)
        }
    })
}

exports.renew_token = (req, res) => {

    const refreshtoken = req.body.token
    if (!refreshtoken) {
        res.status(403).json({ msg: "user not Authenticated" })
    }
    jwt.verify(refreshtoken, "refresh", (err, valid) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "user not authenticated" })
        } else {
            const refreshtoken = jwt.sign({ valid }, "refresh", { expiresIn: "5d" })
            const token = jwt.sign({ valid }, jwtkey, { expiresIn: "10s" })
            res.status(200).json({ accesstoken: token, refreshtoken })

        }
    })
}

// module.exports={
//     user_delete,
//     get_user,
//     add_user,
//     update_user
// }