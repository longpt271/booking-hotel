const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');

// lấy tất cả hotels
exports.getHotels = async (req, res, next) => {
  // if (Object.values(req.query).length === 0) {}
  Hotel.find()
    .populate('rooms')
    // .limit(+req.query.limit)
    .then(hotels => {
      res.status(200).json(hotels);
    })
    .catch(err => res.status(500).json(err));
};

//  search Hotels
exports.postSearchHotels = async (req, res, next) => {
  // console.log(req.query);
  // console.log(req.body);
  const allDates = req.body.allDates || new Date();
  const options = req.body.options || {};

  const limit = +req.query.limit; // Lưu limit vào 1 biến
  delete req.query.limit; // xóa limit trong req.query để tránh lỗi khi find() others

  const { min, max, ...others } = req.query;
  const minPrice = +min || 1; // convert number || default value
  const maxPrice = +max || 999;

  try {
    // Tìm rooms thỏa mãn query "min pirce/max price"
    const filteredRooms = await Room.find({
      price: { $gte: minPrice, $lte: maxPrice }, // $gte (>=), $lte (<=)
      // 'roomNumbers.unavailableDates': { $not: { $elemMatch: { allDates } } },
    }).select('_id roomNumbers maxPeople');

    // Tìm room Trong khoảng thời gian đặt khách sạn còn phòng trống
    const roomsAvailableDates = await filteredRooms.map(room => {
      const roomNumbers = room.roomNumbers;

      // arr lưu boolean phòng trống hay k
      const isAvailable = [];
      for (let i = 0; i < roomNumbers.length; i++) {
        // kiểm tra xem tìm thấy phòng trong ngày khách chọn đã được đặt hay chưa
        const isFound = roomNumbers[i].unavailableDates.some(date =>
          allDates.includes(new Date(date).getTime())
        );

        // Nếu trong ngày đã có ng đặt trả về false, chưa có ng đặt trả true
        isAvailable.push(!isFound);
      }

      // console.log(isAvailable);
      // console.log(isAvailable.includes(true));
      // Nếu có ít nhất 1 phòng trống trong arr ngày đang đặt
      if (isAvailable.includes(true)) {
        // count số people trong phòng ngày trống
        let countRoomAvailable = 0;
        for (let i = 0; i < isAvailable.length; i++) {
          if (isAvailable[i] === true) {
            //Tìm thấy phần tử true trong mảng thì cộng biến đếm
            countRoomAvailable++;
          }
        }

        // Tổng số người trong phòng trong ngày đặt còn trống
        const totalPeopleAvailable = countRoomAvailable * room.maxPeople;

        return { _id: room._id, totalPeopleAvailable, countRoomAvailable }; // trả về room id và tổng maxPeople có thể đặt cho loại phòng này
      } else return { _id: '', totalPeopleAvailable: 0, countRoomAvailable: 0 };
    });
    // console.log(roomsAvailableDates);

    // tìm hotel thỏa mãn query "city": vị trí là thành phố mà người dùng muốn ở
    const hotels = await Hotel.find({
      ...others,
    }).populate('rooms');
    // console.log(hotels);

    //--- lọc hotel
    const filteredHotels = await hotels.filter(hotel => {
      const rooms = hotel.rooms;

      // lọc ra mảng _id room trong từng hotel dc filter
      const hotelRooms = rooms.map(room => room._id);

      // tổng people khả dụng trong khách sạn qua từng phòng khách sạn
      let totalHotelPeople = 0;
      let totalCountRoomAvailable = 0;

      const filteredRoom = roomsAvailableDates.map(room => {
        hotelRooms.map(hotelRoom => {
          // console.log(hotelRoom, room._id, room.totalPeopleAvailable);

          // so sánh với id của room có phòng trống trong tgian đặt
          if (hotelRoom.toString() === room._id.toString()) {
            totalHotelPeople = totalHotelPeople + room.totalPeopleAvailable;
            totalCountRoomAvailable =
              totalCountRoomAvailable + room.countRoomAvailable;
          }
        });

        return room;
      });
      // console.log(hotel.name);
      // console.log(totalHotelPeople, options.adult);
      // console.log(totalHotelPeople >= options.adult);
      // console.log(totalCountRoomAvailable);

      // lọc id thành chuỗi string
      const filteredRoomId = filteredRoom.map(room => room._id).toString();

      // -- nếu tổng số người có thể đặt lớn hơn số người cần đặt
      if (
        totalHotelPeople >= options.adult &&
        totalCountRoomAvailable >= options.room
      ) {
        // lọc trả về Boolean hotel có room tồn tại _id trùng roomId với filteredRoomId hay k
        for (let i = 0; i < rooms.length; i++) {
          return rooms.some(room => filteredRoomId.includes(room._id));
        }
      } else return false;
    });

    // limit kq trả về
    const limitHotels = filteredHotels.slice(0, limit);

    res.status(200).json(limitHotels);
  } catch (err) {
    next(err);
  }
};

// Lấy một hotel
exports.getHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Hotel.findById(hotelId)
    .populate('rooms')
    .then(hotel => {
      res.status(200).json(hotel);
    })
    .catch(err => res.status(500).json(err));
};

// Tạo mới hotel
exports.postNewHotel = (req, res, next) => {
  const hotel = new Hotel({
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    photos: req.body.photos,
    desc: req.body.desc,
    rating: undefined,
    featured: req.body.featured,
    rooms: req.body.rooms,
  });

  hotel
    .save()
    .then(result => {
      // console.log(result)
      console.log('Created Hotel');
      res.status(200).json('Created Hotel');
    })
    .catch(err => res.status(500).json(err));
};

// 13. Cập nhật 1 hotel
exports.postEditHotel = async (req, res, next) => {
  const filter = { _id: req.body._id };
  const update = {
    name: req.body.name,
    type: req.body.type,
    city: req.body.city,
    address: req.body.address,
    distance: req.body.distance,
    desc: req.body.desc,
    photos: req.body.photos,
    featured: req.body.featured,
    rooms: req.body.rooms,
  };

  try {
    // tìm hotel và update
    await Hotel.findOneAndUpdate(filter, update, {
      new: true, // trả về kq new sau khi update
      // returnOriginal: false // có thể thay thế cho new: true
    });

    console.log(`Updated Hotel!`);
    res.status(200).json(`Updated Hotel!`);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Xóa 1 hotel
exports.deleteHotel = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    // Tìm trans có hotelId trùng
    const transBookedInHotel = await Transaction.find({
      hotel: hotelId,
    }).select('_id');

    // Nếu chưa book trans nào cho hotel này
    if (transBookedInHotel.length === 0) {
      await Hotel.findByIdAndRemove(hotelId); // xóa
      res.writeHead(200, 'Deleted Hotel!'); // trả về res.statusText ở client
      res.end('{"message": "Deleted Hotel!"}');
    } else {
      res.writeHead(400, 'Hotel booked. Cant delete!');
      res.end('{"message": "Hotel booked. Cant delete!"}');
    }
  } catch (err) {
    next(err);
  }
};

// Đếm số thành phố theo "city"
exports.getCountByCity = async (req, res, next) => {
  // console.log(req.query);
  const cities = req.query.cities ? req.query.cities.split(',') : [];
  // console.log(cities);
  try {
    const list = await Promise.all(
      cities.map(cityFromQuery => {
        // countDocuments đếm các giá trị trong Document
        return Hotel.countDocuments({ city: cityFromQuery });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

// Đếm số thành phố theo "type"
exports.getCountByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json({
      listType: [
        { type: 'hotel', count: hotelCount },
        { type: 'apartment', count: apartmentCount },
        { type: 'resort', count: resortCount },
        { type: 'villa', count: villaCount },
        { type: 'cabin', count: cabinCount },
      ],
    });
  } catch (err) {
    next(err);
  }
};

// Lấy ra top rating
exports.getTopRating = (req, res, next) => {
  Hotel.find()
    .populate('rooms')
    .sort({ rating: 'desc' })
    .limit(+req.query.limit)
    .then(hotels => {
      // console.log(hotels.length);
      res.status(200).json(hotels);
    })
    .catch(err => res.status(500).json(err));
};

// Data home page (gộp chung 3 thông tin)
exports.getHomeData = async (req, res, next) => {
  const cities = ['Ha Noi', 'Ho Chi Minh', 'Da Nang'];
  const types = ['hotel', 'apartment', 'resort', 'villa', 'cabin'];
  try {
    // Đếm số thành phố theo "city"
    const city0Count = await Hotel.countDocuments({ city: cities[0] });
    const city1Count = await Hotel.countDocuments({ city: cities[1] });
    const city2Count = await Hotel.countDocuments({ city: cities[2] });
    const listCity = [
      { name: cities[0], count: city0Count },
      { name: cities[1], count: city1Count },
      { name: cities[2], count: city2Count },
    ];

    // Đếm số thành phố theo "type"
    const type0Count = await Hotel.countDocuments({ type: types[0] });
    const type1Count = await Hotel.countDocuments({ type: types[1] });
    const type2Count = await Hotel.countDocuments({ type: types[2] });
    const type3Count = await Hotel.countDocuments({ type: types[3] });
    const type4Count = await Hotel.countDocuments({ type: types[4] });
    const listType = [
      { type: types[0], count: type0Count },
      { type: types[1], count: type1Count },
      { type: types[2], count: type2Count },
      { type: types[3], count: type3Count },
      { type: types[4], count: type4Count },
    ];

    // Lấy ra top rating
    const topRating = await Hotel.find()
      .populate('rooms')
      .sort({ rating: 'desc' })
      .limit(3);

    // trả về kết quả gộp 3 tìm kiếm trên
    res.status(200).json({
      listCity,
      listType,
      topRating,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

// lấy tất cả rooms của hotel qua hotelId
exports.getHotelRoom = async (req, res, next) => {
  try {
    // tìm hotel qua hotelId
    const hotel = await Hotel.findById(req.params.hotelId);

    const list = await Promise.all(
      // Tìm data Room qua từng roomId của Hotel.rooms
      hotel.rooms.map(room => {
        return Room.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
