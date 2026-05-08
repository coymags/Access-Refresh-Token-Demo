const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const protect = require('../middleware/authMiddleWare')

router.post('/register', userController.createUser)

router.post('/login', userController.userLogin)

router.get('/refresh', userController.refreshToken)


module.exports = router