const jwtstrategy = require('passport-jwt').Strategy;
const jwtext = require('passport-jwt').ExtractJwt;
const res = require('express/lib/response');
const ct = require('./config');
module.exports = function(passport){
    // console.log("hi");
    passport.use(new jwtstrategy({
        secretOrKey: "test",
        jwtFromRequest: jwtext.fromAuthHeaderAsBearerToken()
    }, (payload, cb) => {
        // console.log(payload.result[0].email);
        const data =payload.result[0].email
        ct.query(`select email,password from userdata where email = ?`,data, (err, result) => {
            if (err) throw err;
            else {
                console.log(result);
                cb(null,result)
            }
        })
    }))
}

