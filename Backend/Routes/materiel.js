const express = require('express')
const router = express.Router()
const materielController = require('../Controllers/materielsController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  materielController.getMateriels)
router.get('/scrape',  materielController.getScrapeMateriels)
router.get('/:id', materielController.getMaterielById)
router.put('/:id', materielController.updateMateriel)
router.post('/', materielController.addMateriel)
router.delete('/:id', materielController.deleteMateriel)
router.put('/scrape/:id',materielController.updateScrape)
router.put('/scrape2/:id',materielController.updateScrape2)



module.exports = router;