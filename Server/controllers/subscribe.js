const PhoneSubscribe = require('../models/PhoneSubscribe');
const EmailSubscribe = require('../models/EmailSubscribe');

// lấy tất cả phones
exports.getPhoneSubscribe = (req, res, next) => {
  PhoneSubscribe.find()
    .then(phones => {
      res.status(200).json(phones);
    })
    .catch(err => res.status(500).json(err));
};

// lấy tất cả emails
exports.getEmailSubscribe = (req, res, next) => {
  EmailSubscribe.find()
    .then(emails => {
      res.status(200).json(emails);
    })
    .catch(err => res.status(500).json(err));
};

// Tạo mới 1 phone
exports.postNewPhoneSubscribe = (req, res, next) => {
  // Tìm tất cả user trong db
  PhoneSubscribe.find().then(phones => {
    const isSamePhone = phones.find(item => item.phone === req.body.phone);

    if (Boolean(isSamePhone)) {
      // trả về lỗi nếu trùng
      res.writeHead(404, 'Already Subscribe that phone!'); // trả về res.statusText ở client
      res.end('{"message": "Already Subscribe that phone!"}');
      return;
    } else {
      const phoneSubscribe = new PhoneSubscribe({
        phone: req.body.phone,
      });

      phoneSubscribe
        .save()
        .then(result => {
          console.log('Created PhoneSubscribe');
          res.status(200).json('Created PhoneSubscribe');
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
};

// Tạo mới 1 email
exports.postNewEmailSubscribe = (req, res, next) => {
  // Tìm tất cả user trong db
  EmailSubscribe.find().then(emails => {
    const isSameEmail = emails.find(item => item.email === req.body.email);

    if (Boolean(isSameEmail)) {
      // trả về lỗi nếu trùng
      res.writeHead(404, 'Already Subscribe that email!'); // trả về res.statusText ở client
      res.end('{"message": "Already Subscribe that email!"}');
      return;
    } else {
      const emailSubscribe = new EmailSubscribe({
        email: req.body.email,
      });

      emailSubscribe
        .save()
        .then(result => {
          console.log('Created EmailSubscribe');
          res.status(200).json('Created EmailSubscribe');
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
};
