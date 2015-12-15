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

router.get('/register', function(req, res) {
  res.render('index', { });
});

router.post('/register', function(req, res) {

  console.log( "username: " +  req.body.username);
  console.log("password: " +  req.body.password)

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {

    if (err) {
      return res.send( "Sorry. That username already exists. Try again.");
    }

    passport.authenticate('local')(req, res, function () {
      res.render('registered');

    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });

});

router.post('/login', passport.authenticate('local'), function(req, res) {
  //res.redirect('login');
  res.json(req.user);

});

router.get('/users', function(req, res){
  //database aanspreken
  //mongoose.service.getusers() = lijst
  //res.json(lijst)
});

module.exports = router;
