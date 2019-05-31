const express = require('express');
const router = express.Router();
const relayController = require('../controller/relayController');
const verifyToken = require('./verifyToken')

router.post('/create', relayController.relayCreate);
router.post('/update/:id', relayController.relayUpdate);
router.post('/pump/:id', relayController.relayUpdatePump);
router.post('/autopump/:id', relayController.relayUpdateAutoPump);
router.get('/config/:id', relayController.relayDetail);
router.get('/index/all', relayController.relayAll);
router.get('/delete/:id', relayController.relayDelete);
router.get('/delete/all', relayController.relayDeleteAll);

module.exports = router;