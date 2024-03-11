const express = require('express');
const router = express.Router();

const { createOrder, getOrders, getOrderDetails } = require('../../controllers/orders');

module.exports = (app) => {

    app.use('/orders/:userId', router);

    router.get('/', getOrders);

    router.post('/', createOrder);

    router.get('/:orderId', getOrderDetails);

};