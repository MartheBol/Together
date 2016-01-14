//namespace api/
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('home');
  res.json({message:"Test message - GET home page"});
});
router.post('/chat', function (req,res) {

  return  res.json({redirect: '/chat', currentUser : req.body.currentUser, contactedUser : req.body.contactedUser});
});


router.post('/login', function(req, res) {

  if (!req.body.username || !req.body.password) {
    return res.json({ error: 'Username and password required.' });
  }
  passport.authenticate('login', function(err, user, info) {
    if (err) {
      return res.json(err);
    }
    if (user.error) {
      return res.json({ error: user.error });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json(err);
      }

      if(user.username == 'admin'){
        return res.json({redirect: '/admin', user: user})
      }



      else{
        return res.json({ redirect: '/activities', user: user });
      }

    });
  })(req, res);
});

router.get('/logout', function(req, res){
  if(!req.user){
    res.redirect('/#/home');
  }
  else {
    req.logout();
    res.redirect('/#/home');
  }
});

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.birthdate || !req.body.lastname || !req.body.firstname || !req.body.zipcode || !req.body.biography ) {
    return res.json({ error: 'All fields are required' });
  };
  passport.authenticate('register', function(err, user) {

   if (err) {
      return res.json(err);
    }

    if (user.error) {
      return res.json({ error: user.error });
    }

    req.logIn(user, function(err) {
      if (err) {
        return res.json(err);
      }

      return res.json({ redirect: '/myprofile' });
    });
  })(req, res);
});

router.get('/user', isLoggedIn, function(req, res){
  return res.json(req.user);
});




function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.json({redirect: '/activities'})
  } else {
    next();
  }
}

module.exports = router;


