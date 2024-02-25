const express = require('express');
const router = express.Router();


module.exports = (app) => {

    app.use(router);

    router.get('/', (req, res) => {
        res.send('Hello from the server!');
    });

};