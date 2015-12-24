//NAMESPACE API/USERS

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema.js');
var userCollection = mongoose.model('User', userSchema, "users");
var find_correctuser = require('../routes/middelware/find_correctuser.js');

router.get('/', function (req, res) {
  User.getUsers(function (users) {
    res.json({userlist: users});
  });
});

router.get('/userdelete/:username',find_correctuser, function (req, res) {
  //console.log(req.correctuser);
  //console.log(req.user.username);

  console.log(req.params.username);

  if(req.user === undefined || req.user.username !== 'admin'){

    res.redirect('/#/home')
  }
  else{
    req.correctuser.remove(function (err) {
      if (err) { return next(err); }
      res.redirect('/#/admin');
    })
  }


});

router.get('/userdetail/:username',find_correctuser, function (req, res) {


  console.log(req.params.username);

  if(req.user === undefined || req.user.username !== 'admin'){
    res.redirect('/#/home')

  }
  else{
    console.log(req.correctuser);
    res.json({correctuser: req.correctuser});
    //res.render('/#/userdetails', {correctuser: req.correctuser});
    //res.redirect('/#/userdetails');
  }

});

module.exports = router;