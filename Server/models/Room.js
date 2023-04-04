const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String, required: true },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  // {number: Number}: number là tên key obj, Number là loại giá trị
});

module.exports = mongoose.model('Room', roomSchema);
