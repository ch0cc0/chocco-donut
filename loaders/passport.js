const passport = require('passport');
const LocalStrategy = require('passport-local');

const {compare_password, getUserByUsername, getUserById} = require('../utils/helper_funcs.js');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            done(null, user);
        } catch (e) {
            done(e);
        }
    });

    const authenticateUser = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);
            if (!user) {
                console.log('No user with that username found')
                return done(null, false, { message: 'No user with that username found' });
            }
    
            if (await compare_password(password, user.password)) {
                console.log('Login Success')
                console.log(user)
                return done(null, user);
            } else {
                console.log('Passwords do not match')
                return done(null, false, { message: 'Passwords do not match' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy(authenticateUser));

    return passport;
}