const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));

const { Schema } = mongoose;

const schema = new Schema({
  _id: String,
  name: String,
  type: String,
  url: String,
  image: {
    aspect_ratio: {
      width: Number,
      height: Number,
    },
    url: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number],
  },
  address: {
    line_1: String,
    city: String,
    state: String,
    state_code: String,
    country: String,
    country_code: String,
    full_name: String,
  },
});

const Venues = mongoose.model('Venues', schema);

module.exports = Venues;
