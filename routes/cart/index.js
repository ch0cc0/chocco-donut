const express = require('express');
const router = express.Router();

const { getCart, addToCart } = require('../../controllers/cart');

module.exports = (app) => {

    app.use('/cart', router);

    router.get('/:userId', getCart);

    router.post('/', addToCart);

};