//NAMESPACE API/USERS

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.get('/', function (req, res) {
  User.getUsers(function (users) {
    res.json({userlist: users});
  });
});

module.exports = router;