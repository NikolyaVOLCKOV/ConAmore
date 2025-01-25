const express = require('express');
const router = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

const AdminControllers = require('../../controllers/admin_console.js');
const OrdersControllers = require('../../controllers/product_controllers/orders_controllers.js');

router.post('/addimage', upload.array('file', 10), AdminControllers.AddImages);
router.post('/addproduct', AdminControllers.AddProduct);
router.put('/upproduct', AdminControllers.UpdateProductInfo);
router.delete('/deleteproduct', AdminControllers.DeleteProduct);

router.post('/addfeature', AdminControllers.AddFeature);
router.put('/upfeature', AdminControllers.UpdateFeature);
router.delete('/delfeature', AdminControllers.DelExFeature);

router.post('/addexfeature', AdminControllers.AddExtendenFeature);
router.put('/upexfeature', AdminControllers.UpdateExFeature);
router.delete('/delexfeature', AdminControllers.DelExFeature);

router.put('/uporstatus', OrdersControllers.UpdateOrderStatus);

module.exports = router