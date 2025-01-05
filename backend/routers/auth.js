const express = require('express')
const router = express()

const auth_controllers = require('../controllers/auth_controllers.js')

router.post('/register', auth_controllers.Register)

module.exports = router