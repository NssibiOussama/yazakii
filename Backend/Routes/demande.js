const express = require('express')
const router = express.Router()
const demandeController = require('../Controllers/demandeController')
const verifyToken = require('../Middlewares/verifyToken')


router.post('/:id', demandeController.demande)


module.exports = router;