const express = require('express');
const hotelController = require('../controllers/hotel');

const router = express.Router();

// lấy tất cả data
router.get('/', hotelController.getHotels);
// lấy 1 hotel
router.get('/find/:hotelId', hotelController.getHotel);
// lấy rooms của hotel
router.get('/find/room/:hotelId', hotelController.getHotelRoom);

// search
router.post('/search', hotelController.postSearchHotels);

// tạo mới
router.post('/new', hotelController.postNewHotel);

// sửa
router.post('/edit', hotelController.postEditHotel);

// xóa
router.delete('/delete/:hotelId', hotelController.deleteHotel);

// đếm số hotel
router.get('/countByCity', hotelController.getCountByCity);
router.get('/countByType', hotelController.getCountByType);
// lọc top rate
router.get('/topRating', hotelController.getTopRating);

// api homepage
router.get('/homeData', hotelController.getHomeData);
module.exports = router;
