const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Transaction = require('../models/Transaction');

// lấy tất cả rooms
exports.getRooms = (req, res, next) => {
  Room.find()
    .then(rooms => {
      // console.log(rooms.length);
      res.status(200).json(rooms);
    })
    .catch(err => res.status(500).json(err));
};

// Lấy một Room
exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  Room.findById(roomId)
    .then(room => {
      res.status(200).json(room);
    })
    .catch(err => res.status(500).json(err));
};

// Tạo mới room
exports.postNewRoom = async (req, res, next) => {
  const hotelId = req.body.hotelId;

  const newRoom = new Room({
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    maxPeople: req.body.maxPeople,
    roomNumbers: req.body.roomNumbers,
  });

  try {
    // Lưu Room vừa tạo
    const savedRoom = await newRoom.save();

    // Tìm và update thêm mới roomId vào hotel.rooms thông qua hotelId
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      res.status(500).json(err);
    }
    console.log('Created Room');
    res.status(200).json('Created Room');
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật 1 room
exports.postEditRoom = async (req, res, next) => {
  const filter = { _id: req.body._id };
  const update = {
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    maxPeople: req.body.maxPeople,
    // roomNumbers: req.body.roomNumbers,
  };

  // Xử lý update roomNumber tránh mất dates đã từng đặt
  // tìm room được edit qua roomId
  let doc = await Room.findOne(filter).select('roomNumbers');
  // Lọc những roomNumber đã được đặt (có unavailableDates tồn tại)
  const roomNumHasBooked = doc.roomNumbers.filter(
    room => room.unavailableDates.length !== 0
  );
  const roomNumBooked = roomNumHasBooked.map(item => +item.number);
  const enteredRoomNumber = req.body.roomNumbers.map(item => +item.number); // data ng dùng nhập
  // console.log(roomNumBooked);

  // list roomNumber gốc từ db
  const docRoomNumbers = doc.roomNumbers.map(item => +item.number);

  // Lọc ra những roomNumber mới k trùng với roomNumber từ db
  const roomNumberNew = req.body.roomNumbers.filter(
    item => !docRoomNumbers.includes(+item.number)
  );
  // console.log(roomNumberNew);

  // Lọc ra những id roomNumber sẽ xóa
  const roomNumberWillDelete = doc.roomNumbers.filter(
    item => !enteredRoomNumber.includes(+item.number)
  );
  // console.log(roomNumberWillDelete);
  const roomNumberIdsWillDelete = roomNumberWillDelete.map(item => item._id);
  // console.log(roomNumberIdsWillDelete);

  try {
    // Kiểm tra xem roomNumber entered có bao gồm tất cả roomNumBooked ko
    const booleanRoomNumberBookedArr = roomNumBooked.map(item => {
      return enteredRoomNumber.includes(+item);
    });
    // console.log(booleanRoomNumberBookedArr);

    // nếu có 1 false trong booleanRoomNumberBookedArr sẽ là thiếu roomNum booked
    const isHasAllRoomNumBooked = () => {
      const isMissRoomBooked = booleanRoomNumberBookedArr.includes(false);
      return !isMissRoomBooked;
    };
    // console.log(isHasAllRoomNumBooked());

    // Nếu có đủ roomNumbers đã được book
    if (isHasAllRoomNumBooked()) {
      //--- tìm Room và update các giá trị khác
      await Room.findOneAndUpdate(filter, update, {
        new: true, // trả về kq new sau khi update
        // returnOriginal: false // có thể thay thế cho new: true
      });

      //--- update giá trị roomNumbers
      // nếu có room mới
      if (roomNumberNew.length !== 0) {
        await Room.updateOne(filter, {
          $push: {
            roomNumbers: roomNumberNew,
          },
        });
      }
      // nếu có room cũ cần xóa
      if (roomNumberIdsWillDelete.length !== 0) {
        await Room.updateOne(filter, {
          $pull: {
            roomNumbers: { _id: roomNumberIdsWillDelete },
          },
        });
      }

      console.log(`Updated Room!`);
      res.writeHead(200, 'Updated Room!');
      res.end(`{"message": 'Updated Room!'}`);
    } else {
      res.writeHead(400, `Pls keep ${roomNumBooked} rooms!`);
      res.end(`{"message": 'Pls keep ${roomNumBooked} rooms!'}`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Cập nhật RoomNumber Date
exports.postEditRoomNumberDate = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.body.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Room status has been updated.');
  } catch (err) {
    next(err);
  }
};

// Xóa 1 room
exports.deleteRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  // console.log(roomId);

  try {
    // lọc ra list id roomNumbers của room dc chọn
    const roomSelected = await Room.find({ _id: roomId }).select('roomNumbers');
    const listRoomNumberIds = await roomSelected[0].roomNumbers.map(
      roomNumber => roomNumber._id
    );
    // console.log(listRoomNumberIds);

    // mảng lưu boolean roomNumber đã được đặt trong trans hay chưa
    const bookedRoomNumberArr = [];
    // lọc từng id listRoomNumberIds trong mảng
    await Promise.all(
      listRoomNumberIds.map(async roomNumberId => {
        try {
          // Tìm room đã được đặt trong trans chưa
          const isBookedThisRoomNumber = await Transaction.find({
            'room._id': roomNumberId,
          }).select('status');

          // push vào bookedRoomNumberArr
          bookedRoomNumberArr.push(Boolean(isBookedThisRoomNumber.length));
        } catch (err) {
          res.status(500).json(err);
        }
      })
    );
    // console.log(bookedRoomNumberArr);

    // nếu có 1 item === true => Room đã được đặt
    const isThisRoomBooked = Boolean(
      bookedRoomNumberArr.find(item => item === true)
    );

    // Nếu room đã được đặt trong trans
    if (isThisRoomBooked) {
      res.writeHead(400, 'Room booked. Cant Delete!'); // trả về res.statusText ở client
      res.end('{"message": "Room booked. Cant Delete!"}'); // trả về data ở client
    } else {
      // lọc list hotelIds có id của room cần tìm
      const list = await Hotel.find({ rooms: roomId }).select('_id');
      // console.log(list);

      // map qua từng hotelId
      await Promise.all(
        list.map(async hotel => {
          // Tìm và update xóa roomId trong hotel.rooms thông qua hotelId
          try {
            await Hotel.findByIdAndUpdate(hotel._id, {
              $pull: { rooms: roomId },
            });
          } catch (err) {
            res.status(500).json(err);
          }
        })
      );

      // xóa room trong rooms
      await Room.findByIdAndRemove(roomId);

      // trả về kq
      res.writeHead(200, 'Deleted Room!'); // trả về res.statusText ở client
      res.end('{"message": "Deleted Room!"}'); // trả về data ở client
      console.log('DESTROYED ROOM');
    }
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};
