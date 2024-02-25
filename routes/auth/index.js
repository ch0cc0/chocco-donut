const express = require('express');
const router = express.Router();

const { signup } = require('../../controllers/auth.js');
const { checkIfNotAuthenticated, checkIfAuthenticated } = require('../../utils/helper_funcs.js');

module.exports = (app, passport) => {

    app.use(router);

    router.post('/signup', checkIfNotAuthenticated, signup);

    router.post('/login', checkIfNotAuthenticated, passport.authenticate('local'), (req, res, next) => {
        console.log(req.session);
        res.status(200).send("Logged In");
    });


    app.post('/logout', checkIfAuthenticated, (req, res) => {
        req.logOut(function(err) {
            if (err) { console.log(err); }
          });
        res.redirect('/login');
    });
};