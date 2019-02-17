const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const verifyRegister = require('./verifyRegister');

router.post('/register', verifyRegister.checkDuplicateUserEmail, userController.register);
router.post('/login', userController.login);
router.post('/:id/update', userController.userUpdate);
router.get('/:id', userController.userDetail);
router.get('/index/all', userController.userAll);

module.exports = router;