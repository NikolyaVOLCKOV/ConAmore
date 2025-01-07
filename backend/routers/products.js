const express = require('express');
const router = express();

const Product_Controllers = require('../controllers/produc_controllers.js')
const Auth_Middleware = require('../middlewares/auth_midlleware.js')

router.post('/productfilter', Product_Controllers.ProductFilter)

module.exports = router