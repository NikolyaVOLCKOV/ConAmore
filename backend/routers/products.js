const express = require('express');
const router = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

const Filter_Controllers = require('../controllers/product_controllers/filter_controllers.js');
const SearchControllers = require('../controllers/product_controllers/search_controllers.js');
const AdminControllers = require('../controllers/admin_console.js');

const Auth_Middleware = require('../middlewares/auth_midlleware.js');

router.post('/productfilter', Filter_Controllers.ProductFilter);
router.post('/search', SearchControllers.SearchProduct);
router.post('/addimage', upload.array('file', 10), AdminControllers.AddImages);

module.exports = router