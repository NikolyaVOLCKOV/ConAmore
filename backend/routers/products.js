const express = require('express');
const router = express();

const Filter_Controllers = require('../controllers/product_controllers/filter_controllers.js')
const SearchControllers = require('../controllers/product_controllers/search_controllers.js')

const Auth_Middleware = require('../middlewares/auth_midlleware.js')

router.post('/productfilter', Filter_Controllers.ProductFilter)
router.post('/search', SearchControllers.SearchProduct)

module.exports = router