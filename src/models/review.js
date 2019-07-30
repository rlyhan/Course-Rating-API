const mongoose = require('mongoose');

var User = require('./user');

var ObjectId = mongoose.Schema.Types.ObjectId;

var ReviewSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: String
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
