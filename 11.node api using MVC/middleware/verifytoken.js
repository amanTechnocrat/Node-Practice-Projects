const jwt = require('jsonwebtoken');
const jwtkey = 'test';

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

module.exports = verifytoken;