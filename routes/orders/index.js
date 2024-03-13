const express = require('express');
const router = express.Router();

const { createOrder, getOrders, getOrderDetails } = require('../../controllers/orders');

module.exports = (app) => {

    app.use('/orders', router);

    router.post('/', createOrder);

    router.get('/:userId', getOrders);    

    router.get('/:userId/:orderId', getOrderDetails);

};