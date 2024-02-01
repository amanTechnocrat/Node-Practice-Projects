const jwt = require('jsonwebtoken');
const jwtkey = 'test';

const gentoken = (data) => { 
    let zz = jwt.sign({ data }, jwtkey, { expiresIn: "8h" })
    return zz
 }

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

module.exports = {gentoken,verifytoken};