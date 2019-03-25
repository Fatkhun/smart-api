const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const verifyRegister = require('./verifyRegister');
const verifyToken = require('./verifyToken')

router.post('/register', verifyRegister.checkDuplicateUserEmail, userController.register);
router.post('/login', userController.login);
router.post('/update/:id', userController.userUpdate);
router.get('/logout/:id', verifyToken, userController.userLogout);
router.get('/index/all', userController.userAll);
router.get('/delete/:id', userController.userDelete);

// login admin
// router.post('/admin/login', userController.adminLogin);

module.exports = router;