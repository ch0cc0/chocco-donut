const express = require('express');
const router = express.Router();

const { updateUser, getUserInfo } = require('../../controllers/user');

module.exports = (app) => {

    app.use('/user', router);

    router.put('/', updateUser);

    router.get('/', getUserInfo);

};