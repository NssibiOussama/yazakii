const express = require('express')
const router = express.Router()
const mdpController = require('../Controllers/mdpController')
const verifyToken = require('../Middlewares/verifyToken')


router.post('/', mdpController.sendConfirmationEmail)
router.post('/update', mdpController.updatePassword)




module.exports = router;