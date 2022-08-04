const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/controller')
const middleware = require('../helper/validation/joi')
const auth = require('../helper/auth/auth')

router.post('/signup', middleware.signUpVal, userCtrl.singup)
router.post('/login', middleware.loginVal, userCtrl.login)
router.delete('/delete-user', userCtrl.RemoveUser)
router.get('/UserImage',auth.checkToken, userCtrl.GetUserImage)
router.put('/update-user', auth.checkToken ,userCtrl.ReviseUser)


module.exports = router;