//namespace api/
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('home');
  res.json({message:"heeeyyyyy"});
});

/*router.get('/register', function(req, res) {
  res.render('index', { });
});

router.post('/register', function(req, res) {


  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {

    if (err) {
      return res.send( "Sorry. That username already exists. Try again.");
    }

    passport.authenticate('local')(req, res, function () {
      //res.render('registered');
    });
  });
});

router.get('/login', function(req, res) {
  //res.render('log
  // in', { user : req.user });
  res.send('login')
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  //res.redirect('login');
  //res.json({message: req.user.username});
  res.send('login werkt')
});

router.get('/users', function(req, res){
  //database aanspreken
  //mongoose.service.getusers() = lijst
  //res.json(lijst)
  res.send('users')
});*/
router.get('/login', function(req,res){
  res.send('login get werkt');
});

router.post('/login', function(req, res) {

  if (!req.body.username || !req.body.password) {
    return res.json({ error: 'Username and Password required' });
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
      return res.json({ redirect: '/home' });
    });
  })(req, res);
});

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
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

      return res.json({ redirect: '/user' });
    });
  })(req, res);
});

router.get('/user', isLoggedIn, function(req, res){
  return res.json(req.user);
});


function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.json({ redirect : '/matches' });
  } else {
    next();
  }
}

module.exports = router;


