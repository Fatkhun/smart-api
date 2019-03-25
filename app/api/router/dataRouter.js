const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.post('/record', dataController.dataCreate);
router.get('/index/all/:limit', dataController.dataAll);
router.get('/delete/:id', dataController.dataDelete);
router.get('/delete/all', dataController.dataDeleteAll);
router.get('/average/all', dataController.dataDetailAll);

module.exports = router;