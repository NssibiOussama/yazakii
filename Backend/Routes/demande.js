const express = require('express')
const router = express.Router()
const demandeController = require('../Controllers/demandeController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/ligneInternet/:role', demandeController.getLigneInternetdemandes)
router.get('/pc/:role', demandeController.getPcdemandes)
router.get('/pcprovisoire/:role', demandeController.getPcProvisoireDemande)
router.put('/ligneInternet/:role/:id', demandeController.UpdateLigneInternetdemandes)
router.put('/pc/:role/:id', demandeController.UpdatePcdemandes)
router.put('/pcprovisoire/:role/:id', demandeController.UpdatePcprovisoiredemandes)

module.exports = router;