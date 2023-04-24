const express = require('express')
const router = express.Router()
const roleController = require('../Controllers/roleController')
const verifyToken = require('../Middlewares/verifyToken')

router.get('/',  roleController.getRoles)
router.get('/:id', roleController.getRolelById)
router.put('/:id', roleController.updateRole)
router.post('/', roleController.addRole)
router.delete('/:id', roleController.deleteRole)




module.exports = router;