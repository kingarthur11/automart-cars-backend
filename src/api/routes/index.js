const express = require('express');
const carRoute = require('./car.route');

const router = express.Router();

router.use('/car', carRoute);

module.exports = router;
