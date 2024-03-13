const express = require('express');
const router = express.Router();

const { verifyPayment } = require('../../controllers/checkout');
const { checkIfAuthenticated } = require('../../utils/helper_funcs.js');

module.exports = (app) => {

    app.use('/verify-payment', router);

    router.get('/', checkIfAuthenticated, verifyPayment);

};