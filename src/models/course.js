const mongoose = require('mongoose');

var User = require('./user');
var Review = require('./review');

var ObjectId = mongoose.Schema.Types.ObjectId;

var CourseSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  estimatedTime: String,
  materialsNeeded: String,
  steps: [{
    stepNumber: Number,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }]
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
