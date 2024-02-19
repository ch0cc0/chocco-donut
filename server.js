if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const initializePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

initializePassport(passport);

const app = express();
const port = process.env.PORT || 8000;


app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

/* app.use(passport.initialize());
app.use(passport.session());
*/
app.use(express.json());
app.use(cors());


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });