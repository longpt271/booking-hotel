const express = require('express');
const roomController = require('../controllers/room');

const router = express.Router();

// lấy tất cả data
router.get('/', roomController.getRooms);
// lấy tất 1 data
router.get('/:roomId', roomController.getRoom);

// tạo mới
router.post('/new', roomController.postNewRoom);

// sửa
router.post('/edit', roomController.postEditRoom);
router.post('/editRoomNumberDate', roomController.postEditRoomNumberDate);

// xóa
router.delete('/delete/:roomId', roomController.deleteRoom);

module.exports = router;
