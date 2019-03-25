const express = require('express');
const router = express.Router();
const relayController = require('../controller/relayController');

router.post('/create', relayController.relayCreate);
router.post('/update/:id', relayController.relayUpdate);
router.get('/index/all', relayController.relayAll);
router.get('/delete/:id', relayController.relayDelete);
router.get('/delete/all', relayController.relayDeleteAll);

module.exports = router;