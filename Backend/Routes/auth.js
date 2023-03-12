const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const authController = require('../Controllers/authController')


//signup route
router.post('/signup', authController.sigunup);



// login route
router.post('/login', authController.login);


//confirm Email
//router.get('/confirm/:code', authController.confirmEmail)



module.exports = router;

