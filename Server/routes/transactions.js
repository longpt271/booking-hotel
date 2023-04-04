const express = require('express');
const transactionController = require('../controllers/transaction');

const router = express.Router();

// lấy tất cả data
router.get('/', transactionController.getTransactions);
router.get('/last8trans', transactionController.getLast8Transactions);

// lấy tất cả data theo userId
router.post('/findByUserId', transactionController.postTransactionsByUserId);

// tạo mới
router.post('/new', transactionController.postNewTransaction);

// sửa status
router.post('/editStatus', transactionController.postEditStatusTransaction);

module.exports = router;
