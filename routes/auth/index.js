require('dotenv').config();
const redirectURL = process.env.CLIENT_URL + '/'
const express = require('express');
const router = express.Router();

const { signup } = require('../../controllers/auth.js');
const { checkIfNotAuthenticated } = require('../../utils/helper_funcs.js');

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.post('/signup', checkIfNotAuthenticated, signup);

    router.post('/login', checkIfNotAuthenticated, passport.authenticate('local'), (req, res) => {
        req.session.userId = req.user.id;

        console.log(req.session);
        
        delete req.user.password;
        res.status(200).send(req.user);
    });

    router.get('/login', (req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/auth/login`)
    });

    router.post('/logout', (req, res) => {
        req.logOut(function(err) {
            if (err) { console.log(err); }
          });

        // redirect to homepage
        res.redirect('/');
    });

    router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

    router.get('/google/callback',
        passport.authenticate('google', { successRedirect: redirectURL, failureRedirect: '/auth/login' })
    );
};