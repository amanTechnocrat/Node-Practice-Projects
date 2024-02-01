const jwt = require('jsonwebtoken');
const jwtkey = 'test';

const verifytoken = (req, res, next) => {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).json({ msg: "Token has expired" })
            } else {
                next()
            }
        })
    } else {
        res.status(401).send("invalid req")
    }
}

module.exports = verifytoken;