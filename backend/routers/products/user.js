const express = require('express');
const router = express();

const Filter_Controllers = require('../../controllers/product_controllers/filter_controllers.js');
const SearchControllers = require('../../controllers/product_controllers/search_controllers.js');
const OrdersControllers = require('../../controllers/product_controllers/orders_controllers.js');
const FavoritesControllers = require('../../controllers/product_controllers/favorite_controllers.js');
const CartControllers = require('../../controllers/product_controllers/cart_controllers.js');

const AdminControllers = require('../../controllers/admin_console.js');

const Auth_Middleware = require('../../middlewares/auth_midlleware.js');

router.get('/productfilter', Filter_Controllers.ProductFilter);
router.post('/search', SearchControllers.SearchProduct);
router.get('/getimgs', AdminControllers.ReturnImages)

router.post('/makeorder', OrdersControllers.MakeOrder);
router.delete('/repealorder', OrdersControllers.DeleteOrder);

router.post('/addfav', FavoritesControllers.AddToFavorites);
router.post('/delfav', FavoritesControllers.DeleteProductFromFAvorites);

router.post('/addtocart', CartControllers.AddToCart);
router.post('/delfromcart', CartControllers.DeleteProductFromCart);

module.exports = router