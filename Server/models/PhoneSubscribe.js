const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneSubscribeSchema = new Schema({
  phone: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('PhoneSubscribe', phoneSubscribeSchema);
