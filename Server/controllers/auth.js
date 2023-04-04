const User = require('../models/User');

exports.getIndex = (req, res, next) => {
  res.json({ message: 'This is auth endpoint!' });
};

// Tạo mới 1 user
exports.postRegister = (req, res, next) => {
  // Tìm tất cả user trong db
  User.find().then(users => {
    const isSameUser = users.find(user => user.username === req.body.username);
    const isSameEmail = users.find(user => user.email === req.body.email);

    if (isSameUser) {
      // trả về lỗi nếu trùng username
      res.status(404).json({ warnMessage: 'Already have that username' });
      return;
    } else if (isSameEmail) {
      // trả về lỗi nếu trùng email
      res.status(404).json({ warnMessage: 'Already have that email' });
      return;
    } else {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        fullName: '',
        phoneNumber: 0,
        email: req.body.email,
        isAdmin: false,
      });

      user
        .save()
        .then(result => {
          console.log('Created User');
          res.status(200).json('Created User');
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // nếu k có user
    if (!user) {
      res.status(404).json({ warnMessage: 'User not found!' });
      return;
    }

    // nếu sai password
    const isPasswordCorrect = req.body.password === user.password;
    if (!isPasswordCorrect) {
      res.status(404).json({ warnMessage: 'Wrong password or username!' });
      return;
    }

    // lấy ra các thông tin cần thiết của "user"
    const { password, isAdmin, ...otherDetails } = user._doc;
    // send ra isAmin và các thông tin khác (k lấy password)
    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
