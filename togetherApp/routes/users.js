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
    console.log('Je komt in de userdelete route');
    /*if(req.user === undefined || req.user.username !== 'admin'){
     res.redirect('/#/home')
     }
     else {*/
    userCollection.findOneAndUpdate(
        {username: req.params.username},
        {$set: {deleted: true}},
        function (err, model) {
            console.log("Error: " + err);
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
                                console.log("Error: " + err);

                            }
                        );
                    }
                }
            }
        }
    });
    res.json("The user " + req.params.username + " has been deleted.");


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

router.post('/updateprofile', function (req, res) {
    console.log(req.body);
    console.log("UPDATE PROFILE");

    if(req.user.username !== undefined){

     userCollection.findOneAndUpdate(
     {username: req.user.username},
     {$set: {
         username: req.body.username,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         birthdate : req.body.birthdate,
         zipcode: req.body.zipcode,
         sex : req.body.sex,
         biography: req.body.biography
        }
     },
     function (err, model) {
        console.log("Error: " + err);
     });

     res.json("Your profile has been changed");
     }

     else{
        res.json("Something is wrong, you are not logged in yet!")
     }

});

module.exports = router;