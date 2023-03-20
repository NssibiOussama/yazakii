const express = require('express')
const router = express.Router()
const materielController = require('../Controllers/materielsController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  materielController.getMateriels)

router.get('/:id', materielController.getMaterielById)
router.put('/:id', materielController.updateMateriel)
router.post('/', materielController.addMateriel)
router.delete('/:id', materielController.deleteMateriel)

module.exports = router;