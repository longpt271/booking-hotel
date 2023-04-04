const Transaction = require('../models/Transaction');

// lấy tất cả Transactions
exports.getTransactions = (req, res, next) => {
  Transaction.find()
    .populate('hotel', 'name')
    .then(transactions => {
      // console.log(transactions.length);
      res.status(200).json(transactions);
    })
    .catch(err => res.status(500).json(err));
};

// lấy 8 Transactions gần nhất
exports.getLast8Transactions = (req, res, next) => {
  Transaction.find()
    .sort({ _id: 'desc' }) // sort _id gần đây nhất
    .limit(8) // limit 8 trans
    .populate('hotel', 'name')
    .then(transactions => {
      res.status(200).json(transactions);
    })
    .catch(err => res.status(500).json(err));
};

exports.postTransactionsByUserId = (req, res, next) => {
  const username = req.body.username;

  Transaction.find({ user: username })
    .populate('hotel', 'name')
    .then(transactions => {
      res.status(200).json(transactions);
    })
    .catch(err => res.status(500).json(err));
};

// Tạo mới transaction
exports.postNewTransaction = (req, res, next) => {
  const transaction = new Transaction({
    user: req.body.user,
    hotel: req.body.hotel,
    room: req.body.room,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    price: req.body.price,
    payment: req.body.payment,
    status: req.body.status,
    userInfo: req.body.userInfo,
  });

  if (req.body.room.length === 0) {
    res.writeHead(400, 'Pick a room!'); // trả về res.statusText ở client
    res.end('{"message": "Pick a room!"}'); // trả về data ở client
  } else if (req.body.payment === '') {
    res.writeHead(400, 'Pick a payment!');
    res.end('{"message": "Pick a payment!"}');
  } else {
    transaction
      .save()
      .then(result => {
        // console.log(result)
        console.log('Created Transaction');
        res.status(200).json('Booking successfully!');
      })
      .catch(err => res.status(500).json(err));
  }
};
// Cập nhật status Transaction
exports.postEditStatusTransaction = (req, res, next) => {
  const transactionId = req.body._id;

  Transaction.findById(transactionId)
    .then(transaction => {
      transaction.status = req.body.status;

      return transaction.save();
    })
    .then(result => {
      console.log(`UPDATED TRANSACTION (${transactionId})!`);
      res.status(200).json(`UPDATED TRANSACTION (${transactionId})!`);
    })
    .catch(err => res.status(500).json(err));
};
