const express = require('express');
const router = express.Router();
const auth = require('basic-auth');

var User = require('../models/user');
var Course = require('../models/course');

function authenticateUser(req, res, next) {
  let message = null;

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the data store
    // by their email (i.e. the user's "key"
    // from the Authorization header).

    User.authenticate(credentials.name, credentials.pass, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.user = user;
        return next();
      }
    });

  } else {
    message = 'Auth header not found';
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  }
}

// Checks whether the reviewer (parsed from Authentication header) is the same
// as the one who created the course
// If so, return an error
function checkReviewer(req, res, next) {
  // Find the user in charge of course
  Course.findById(req.params.courseId)
            .exec(function(err, course) {
              if(err) return next(err);
              // Check that the current authenticated user is not the same as the user
              // in charge of the course
              if (req.user._id.equals(course.user._id)) {
                var err = new Error('You cannot review your own course.');
                err.status = 401;
                return next(err);
              } else {
                return next();
              }
            });
}

module.exports.authenticateUser = authenticateUser;
module.exports.checkReviewer = checkReviewer;
