const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const morgan = require('morgan');

module.exports = (app) => {

    app.use(flash());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, maxAge: 24 * 60 * 60 }
    }));

    app.use(morgan('tiny'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionSuccessStatus:200,
        preflightContinue: true,
    }));

    return app;
}