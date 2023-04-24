const express = require('express')
const router = express.Router()
const departementController = require('../Controllers/departementController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  departementController.getDepartements)
router.get('/:id', departementController.getDepartementlById)
router.put('/:id', departementController.updateDepartement)
router.post('/', departementController.addDepartement)
router.delete('/:id', departementController.deleteDepartement)




module.exports = router;