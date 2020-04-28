const localStrategy = require('passport-local').Strategy

function initialize(passport, getByUsername, getById) {
    const authenticate = async (username, password, done) => {
        const user = getByUsername(username)
        if (user == null) {
            console.log('No user exists with that username')
            return done(null, false)
        }

        try {
            if (password === user.password) {
                console.log('Success')
                return done(null, user)
            } else {
                console.log('Wrong password')
                done(null, false)
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new localStrategy({ usernameField: 'username' }, authenticate))

    passport.serializeUser((user, done) => done(null, user.username))

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = initialize