const express = require('express');
const subscribeController = require('../controllers/subscribe');

const router = express.Router();

// get all phone subscribe
router.get('/phone', subscribeController.getPhoneSubscribe);

// add mới phone subscribe
router.post('/phone', subscribeController.postNewPhoneSubscribe);

// get all email subscribe
router.get('/email', subscribeController.getPhoneSubscribe);
// add mới email subscribe
router.post('/email', subscribeController.postNewEmailSubscribe);

module.exports = router;
