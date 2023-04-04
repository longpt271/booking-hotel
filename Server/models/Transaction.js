const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: String, required: true },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
  room: [{ _id: Schema.Types.ObjectId, roomNumber: Number, price: Number }],
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, default: 'Booked' },
  userInfo: { type: { String } }, // thông tin người dùng nhập từ form
});

module.exports = mongoose.model('Transaction', transactionSchema);
