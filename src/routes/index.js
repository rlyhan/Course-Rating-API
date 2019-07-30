const express = require('express');

const router = express.Router();

var User = require('../models/user');
var Course = require('../models/course');
var Review = require('../models/review');
var mid = require('../middleware');

// GET /users
// Parses user credentials from authorization header in middleware
// Authenticates the user in the user model, returns user
router.get('/users', mid.authenticateUser, function(req, res, next) {
  return res.status(200).json({
    user: req.user.emailAddress
  });
});

// POST /users
router.post('/users', function(req, res, next) {
  if (req.body.fullName &&
      req.body.emailAddress &&
      req.body.password &&
      req.body.confirmPassword) {

        // confirm user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
          var err = new Error('Passwords do not match.');
          err.status = 400;
          return next(err);
        }

        // create object with form input
        var userData = {
          fullName: req.body.fullName,
          emailAddress: req.body.emailAddress,
          password: req.body.password
        };

        // use schema's create method to insert document into Mongo
        User.create(userData, function (error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.userId = user._id;
            res.location('/');
            return res.status(201).end();
          }
        });
      } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
});

// GET /courses
router.get('/courses', function(req, res, next){
  Course.find({}, 'title')
            .exec(function(err, courses) {
              if(err) return next(err);
              res.json(courses);
            });
});

// GET /courses/:courseId
router.get('/courses/:courseId', function(req, res, next){
  Course.findById(req.params.courseId)
            .populate('user')
            .populate('reviews')
            .exec(function(err, course) {
              if(err) return next(err);
              res.json(course);
            });
});

// POST /courses
router.post('/courses', mid.authenticateUser, function(req, res, next){
  if (req.body.title &&
      req.body.description &&
      req.body.steps) {

        // return an error if a step is missing a title or description field
        // else, add to courseSteps array
        for (let i = 0; i < req.body.steps.length; i++) {
          console.log(req.body.steps[i].title);
          if (!req.body.steps[i].title || !req.body.steps[i].description) {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
          }
        }

        // use schema's create method to insert document into Mongo
        Course.create(req.body, function (error, user) {
          if (error) {
            return next(error);
          } else {
            res.location('/');
            return res.status(201).end();
          }
        });
      } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
      }
});

router.put('/courses/:courseId', mid.authenticateUser, function(req, res, next){
  Course.findByIdAndUpdate(req.params.courseId, req.body, function(err, result) {
    if(err) return next(err);
    res.status(204).end();
  });
});

router.post('/courses/:courseId/reviews', mid.authenticateUser, mid.checkReviewer, function(req, res, next){
  // find the course of given id
  Course.findById(req.params.courseId)
            .exec(function(err, course) {
              if(err) return next(err);
              // make sure a rating has been provided in the body
              if (req.body.rating) {
                // create the review
                Review.create(req.body, function(error, review) {
                  if (error) {
                    return next(error);
                  } else {
                    // add the review to the list of reviews in the course
                    Course.update({_id: req.params.courseId}, {$push: {reviews: review._id}}, function(err, result){
                      if(err) return next(err);
                      res.location('/');
                      return res.status(201).end();
                    });
                  }
                });
              } else {
                var err = new Error('All fields required.');
                err.status = 400;
                return next(err);
              }
            });
});

module.exports = router;
