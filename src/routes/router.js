const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.list);
router.post('/add', appController.save);
router.post('/send', appController.send);
router.post('/search', appController.search);

module.exports = router;