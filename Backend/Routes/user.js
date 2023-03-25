const express = require('express')
const router = express.Router()
const usersController = require('../Controllers/usersController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  usersController.getUsers)
router.delete('/:id' , usersController.deleteUser)
router.put('/:id', usersController.updateUsers)
router.get('/:id',usersController.getUserById)




module.exports = router;