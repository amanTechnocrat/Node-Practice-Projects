const jwt = require('jsonwebtoken');
const jwtkey = 'test';

const gentoken = (data,time) => { 
    let zz = jwt.sign({ data }, jwtkey, { expiresIn: time })
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
                res.valid = valid;
                next()
            }
        })
    } else {
        res.status(401).send("invalid req")
    }
}

module.exports = {gentoken,verifytoken};