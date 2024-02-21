const express = require('express');
const router = express.Router();

const { signup } = require('../../controllers');
const { checkIfNotAuthenticated } = require('../../utils/helper_funcs.js');

router.post('/signup', checkIfNotAuthenticated, signup);

module.exports = router;