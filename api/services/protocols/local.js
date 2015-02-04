var validator = require('validator');

/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {
  /*
  var email    = req.param('email')
    , username = req.param('username')
    , password = req.param('password')
    , first_name = req.param('first_name');
  */
  //console.log(req);

   var email    = req.param('email')
    , username  = req.param('username')
    , password  = req.param('password')
    , promotion  = req.param('promotion') || 0.00
    //, passwordConfirm = req.param('passwordConfirm')
    , firstName = req.param('firstName')
    , lastName = req.param('lastName')
    , id = req.param('id'); 

  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No email confirmation was entered.'));
  }

  /*
  if (!id) {
    req.flash('error', 'Error.Passport.Id.Missing');
    return next(new Error('No id was submitted.'));
  }
  */

  
  if (!username) {
    req.flash('error', 'Error.Passport.Username.Missing');
    return next(new Error('No username was entered.'));
  }

  if (!password) {
    req.flash('error', 'Error.Passport.Password.Missing');
    return next(new Error('No password was entered.'));
  }
  /*
  if(password !== passwordConfirm) {
    req.flash('error', 'Error.Passport.Password.NoMatch');
    return next(new Error('Passwords do not match.'));
  }
  */
  /*
  if (!first_name) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No first name was entered.'));
  }
  */
  if (!firstName) {
    req.flash('error', 'Error.Passport.Name.Missing');
    return next(new Error('No first name was entered.'));
  }
  if (!lastName) {
    req.flash('error', 'Error.Passport.Name.Missing');
    return next(new Error('No last name was entered.'));
  }

  
  User.create({
    username : username,
    email    : email,
  	firstName: firstName,
    lastName: lastName,
    promotion: promotion
  })
  .exec(function (err, user) {
    if (err) {
      req.flash('error', 'Error.Passport.User.Exists');
      return next(err);
    }

    Passport.create({
      protocol : 'local'
    , password : password
    , user     : user.id
    }).exec(function (err, passport) {
      next(err, user);
    });
  });

  /*
  User.findOne({email: email}).exec(function (err, user) {
    //var user = users[0];
    //console.log(user);
    User.update(user.id, { 
        name : name,
        title : title
      }).exec(function (err, user) {});

    if (err) {
      req.flash('error', 'Error.Passport.User.Exists');
      return next(err);
    }
    
    Passport.findOne({
      protocol : 'local',
      user     : user.id
    }).exec(function (err, passport) {
      
      if (err) return next(err);

      if (!passport) {
        
        console.log('Passport Not Found! Lets make one');

        Passport.create({
          protocol : 'local'
        , password : password
        , user     : user.id

        }).exec(function (err, passport) {
          
          //console.log(passport);
          //console.log(err);
          return res.json(user);
          //next(err, user);
        });
      }
      else {
        next(null, user);
      }
    });
  });
  */
};


exports.joinAccount = function (req, res, next) {
  var email    = req.param('joinEmail')
  , password   = req.param('joinPassword');

  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No email confirmation was entered.'));
  }

  if (!password) {
    req.flash('error', 'Error.Passport.Password.Missing');
    return next(new Error('No password was entered.'));
  }

  User.findOne({
    email: email,
  })
  .exec(function (err, user) {
    if (err) {
      req.flash('error', 'Error.Passport.User.Exists.Not');
      return next(err);
    }

    Passport.create({
      protocol : 'local'
    , password : password
    , user     : user.id
    }).exec(function (err, passport) {
      next(err, user);
    });
  });

};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user     = req.user
    , password = req.param('password');

  Passport.findOne({
    protocol : 'local'
  , user     : user.id
  }).exec(function (err, passport) {
    if (err) return next(err);

    if (!passport) {
      Passport.create({
        protocol : 'local'
      , password : password
      , user     : user.id
      }).exec(function (err, passport) {
        next(err, user);
      });
    }
    else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {
  //console.log(identifier);
  var isEmail = validator.isEmail(identifier)
    , query   = {};

  if (isEmail) {
    query.email = identifier;
  }
  else {
    query.username = identifier;
  }

  User.findOne(query).exec(function (err, user) {
    //console.log(err);
    if (err) return next(err);

    if (!user) {
      if (isEmail) {
        req.flash('error', 'Error.Passport.Email.NotFound');
      } else {
        req.flash('error', 'Error.Passport.Username.NotFound');
      }
      return next(null, false);
    }

    Passport.findOne().where({
     protocol : 'local',
     user     : user.id
    }).exec(function (err, passport) {
      console.log(passport);
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) return next(err);

          if (!res) {
            req.flash('error', 'Error.Passport.Password.Wrong');
            return next(null, false);
          } else {
            return next(null, user);
          }
        });
      }
      else {
        req.flash('error', 'Error.Passport.Password.NotSet');
        return next(null, false);
      }
    });
  });
};
