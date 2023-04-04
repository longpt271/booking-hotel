const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);

router.post('/edit', userController.postEditUser);

router.delete('/delete/:userId', userController.deleteUser);

module.exports = router;
