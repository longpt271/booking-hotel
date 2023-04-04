const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSubscribeSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('EmailSubscribe', emailSubscribeSchema);
