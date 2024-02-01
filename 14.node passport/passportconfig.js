const localstrategy = require('passport-local').Strategy;
const passport = require('passport');
const ct = require('./config');


exports.intinalpassport = async () => {
    
    passport.use(new localstrategy(async (email, password, done) => {
        data = [req.body.email, req.body.password];
        const user = ct.query('select email,password from userdata where email = ? and password = ?', data, (err, result, field) => {
            if (err) throw err;
        })
        if (!user) { return done(null, false) }

        else {
            return done(null, user)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await ct.query('select email,password from userdata where id = ?', id, (err, result, field) => {
            if (err) throw err;
            else {
                done(null, user)
            }
        })
    })
}
