require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {compare_password, getUserByUsername, getUserById, googleLogin} = require('../utils/helper_funcs.js');

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

    const callbackURL = process.env.API_URL + '/auth/google/callback'

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL,
        scope: ['profile', 'email'],
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await googleLogin(profile);
          return done(null, user);
        } catch(err) {
          return done(err);
        }
    }));

    return passport;
}