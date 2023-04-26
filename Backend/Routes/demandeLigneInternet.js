const express = require('express')
const router = express.Router()
const demandeController = require('../Controllers/ligneInternetController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  demandeController.getdemandes)
router.get('/:id', demandeController.getDemandeById)
router.put('/:id', demandeController.updateDemande)
router.post('/:user_id', demandeController.addDemande)
router.delete('/:id', demandeController.deleteDemande)




module.exports = router;