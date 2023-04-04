const User = require('../models/User');

// lấy tất cả users
exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      // console.log(users.length);
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
};

// Lấy một user
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      // lấy ra các thông tin cần thiết của "user"
      const { password, isAdmin, ...otherDetails } = user._doc;
      // send ra các thông tin khác (k lấy password, isAmin)
      res.status(200).json({ ...otherDetails });
    })
    .catch(err => res.status(500).json(err));
};

// Cập nhật khi edit user-info
exports.postEditUser = (req, res, next) => {
  const userId = req.body._id;

  User.findById(userId)
    .then(user => {
      user.fullName = req.body.fullName;
      user.phoneNumber = req.body.phoneNumber;

      return user.save();
    })
    .then(result => {
      console.log(`UPDATED USER (${userId})!`);
      res.status(200).json(`UPDATED USER (${userId})!`);
    })
    .catch(err => res.status(500).json(err));
};

// Xóa 1 user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .then(() => {
      console.log('DESTROYED USER');
      res.status(200).json('DESTROYED USER');
    })
    .catch(err => res.status(500).json(err));
};
