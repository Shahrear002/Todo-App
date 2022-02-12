const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../model/User')

const opts = {}
opts.JwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.SecretOrKey = process.env.SecretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(err) {
                    return done(err, false)
                }
                if(user) {
                    return done(null, user)
                }
                else {
                    return done(null, false)
                }
            })
    }))
}