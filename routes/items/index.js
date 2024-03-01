const express = require('express');
const router = express.Router();

const { getItems } = require('../../controllers/items.js');

module.exports = (app) => {

    app.use('/items', router);

    router.get('/', getItems);

};