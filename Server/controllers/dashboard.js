const User = require('../models/User');
const Transaction = require('../models/Transaction');

// lấy data
exports.getIndex = async (req, res, next) => {
  try {
    const users = await User.find();
    const trans = await Transaction.find();

    // Tìm tất cả trans đã checkout
    const checkouts = await Transaction.find({ status: 'Checkout' });
    const earnings = checkouts
      .map(item => item.price) // lấy tất cả price
      .reduce((a, b) => a + b, 0); // sum

    const monthsEarn = [];

    for (let i = 1; i <= 12; i++) {
      const month = i < 10 ? '0' + i : i;

      // Tìm qua từng tháng của năm
      const earningsPerMonth = await Transaction.find({
        status: 'Checkout',
        dateEnd: { $regex: `/${month}/` },
      }).select('price');

      // lấy ra price mỗi tháng dạng mảng
      const pricePerMonthArr = earningsPerMonth.map(item => item.price);
      // console.log(pricePerMonthArr);

      // Tính tổng price mỗi tháng
      let pricePerMonth = 0;
      if (pricePerMonthArr.length > 1) {
        pricePerMonth = pricePerMonthArr.reduce((a, b) => a + b, 0);
      } else {
        [pricePerMonth] = pricePerMonthArr;
      }
      // console.log(month, pricePerMonth);

      // push vào mảng nếu có price checkout
      if (pricePerMonthArr.length !== 0) {
        monthsEarn.push(pricePerMonth);
      }
    }
    // console.log(monthsEarn);

    const totalEarn = monthsEarn.reduce((a, b) => a + b, 0); // total earn các hóa đơn checkout các tháng
    const totalMonth = monthsEarn.length; // total các tháng có hóa đơn checkout
    // console.log(totalEarn, totalMonth);

    const balance = totalEarn / totalMonth;

    res.status(200).json({
      users: users.length,
      orders: trans.length,
      earnings,
      balance,
    });
  } catch (err) {
    next(err);
  }
};
