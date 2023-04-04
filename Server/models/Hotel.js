const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: [{ type: String }] },
  desc: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  featured: { type: Boolean, default: false },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
});

module.exports = mongoose.model('Hotel', hotelSchema);
