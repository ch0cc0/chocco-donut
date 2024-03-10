const express = require('express');
const router = express.Router();

const { checkout } = require('../../controllers/checkout');

module.exports = (app) => {

    app.use('/checkout', router);

    router.post('/', checkout);

};