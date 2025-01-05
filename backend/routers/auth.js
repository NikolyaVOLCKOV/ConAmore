const express = require('express');
const router = express();

const auth_controllers = require('../controllers/auth_controllers.js');

router.post('/register', auth_controllers.Register);

router.post('/login', auth_controllers.Login);
router.post('/forgotpasswordsendemail', auth_controllers.ForgotPasswordMailSendler);
router.put('/forgotpasswordchange', auth_controllers.ForgotPassword);

module.exports = router