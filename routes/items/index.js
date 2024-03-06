const express = require('express');
const router = express.Router();

const { getItems, getItemById } = require('../../controllers/items.js');

module.exports = (app) => {

    app.use('/items', router);

    router.get('/', getItems);

    router.get('/:id', getItemById);

};