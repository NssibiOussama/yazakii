const express = require('express')
const router = express.Router()
const usersController = require('../Controllers/usersController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  usersController.getUsers)



module.exports = router;