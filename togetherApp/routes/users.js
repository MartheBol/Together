//NAMESPACE API/USERS

var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema.js');
var userCollection = mongoose.model('User', userSchema, "users");

var find_correctuser = require('../routes/middelware/find_correctuser.js');

var Activity = require('../models/activity');
var activitySchema = require('../schemas/activitySchema.js');
var activityCollection = mongoose.model('Activity', activitySchema, "activities");

router.get('/', function (req, res) {
    User.getUsers(function (users) {
        res.json({userlist: users});
    });
});

router.get('/userdelete/:username', find_correctuser, function (req, res) {
    console.log('je komt in de userdelete route');
    /*if(req.user === undefined || req.user.username !== 'admin'){
     res.redirect('/#/home')
     }
     else {*/
    userCollection.findOneAndUpdate(
        {username: req.params.username},
        {$set: {deleted: true}},
        function (err, model) {
            console.log("dit is een" + err);
        }
    );

    Activity.getActivities(function (activities) {
        for (var i = 0; i < activities.length; i++) {
            for (var ii = 0; ii < activities[i].matches.length; ii++) {
                if (activities[i].matches[ii] == req.params.username) {
                    var matchactivities = [];
                    matchactivities.push(activities[i]);

                    for (var iii = 0; iii < matchactivities.length; iii++) {
                        console.log(matchactivities[iii].activityName);
                        activityCollection.findOneAndUpdate(
                            {activityName: matchactivities[iii].activityName},
                            {$pull: {matches: req.params.username}},
                            function (err, model) {
                                console.log("dit is een " + err);

                            }
                        );
                    }
                }
            }
        }
    });
    res.json("De user " + req.params.username + "is verwijderd");


});

router.get('/userdetail/:username', find_correctuser, function (req, res) {
    console.log(req.params.username);

    if (req.user === undefined || req.user.username !== 'admin') {
        res.redirect('/#/home')

    }
    else {
        res.json({correctuser: req.correctuser});
        //res.render('/#/userdetails', {correctuser: req.correctuser});
        //res.redirect('/#/userdetails');
    }

});

router.get('/updateprofile', function (req, res) {
    userCollection.findOneAndUpdate(
        {username: req.user.username},
        {
            $set: {
                username: req.body.username,
                password: req.body.password,
                zipcode: req.body.zipcode,
                birthdate : req.body.birthdate,
                sex : req.body.sex,
                biography: req.body.biography
            }
        },
        function (err, model) {
            console.log("dit is een" + err);
        }
    );
});

module.exports = router;