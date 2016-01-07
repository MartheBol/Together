/**
 * Created by Nikita on 28/12/2015.
 */
var express = require('express');
var Activity = require('../models/activity');
var router = express.Router();
var mongoose = require('mongoose');
var activitySchema = require('../schemas/activitySchema.js');
var activityCollection = mongoose.model('Activity', activitySchema, "activities");
var find_correctactivity = require('../routes/middelware/find_correctactivity.js');

router.post('/addactivity', function(req, res) {
    if (!req.body.activityName) {
        res.json({ error: 'All fields are required' });
    }else{
        //newActivity.image = req.body.fileinput;
        var matches = [];
        matches.push(req.user.username);
        console.log("De eindtijd is: " + req.body.endTimeHour + req.body.endTimeMin)
        var newActivity = new Activity({
            activityName :req.body.activityName,
            zipcode :req.body.zipcode,
            street: req.body.street,
            number: req.body.number,
            description :req.body.description,
            fromDate :  req.body.dateFrom,
            untilDate :  req.body.dateUntil,
            timestamp : req.body.timestamp,
            user : req.user.username,
            matches:matches,
            deleted:false


    });
        console.log(newActivity);

        newActivity.save(function(err, newAct) {
            if (err)  console.error(err);
            console.dir(newAct);
        });
        res.json("hallo")
    }
});

router.post('/interested', function(req, res) {

    activityCollection.findOneAndUpdate(
        {activityName: req.body.activityName},
        {$push: {matches: req.body.interestedUser}},
        {safe: true, upsert: true},
        function(err, model) {
            if(err !== null){
                console.log("dit is een "+err);
            }
        }
    );
    res.json("added");
    console.log("match added");

});

router.post('/deleteinterested', function(req, res) {
    activityCollection.findOneAndUpdate(
        {activityName: req.body.activityName},
        {$pull: {matches: req.body.interestedUser}},
        function(err, model) {
            console.log("dit is een "+err);

        }
    );
    res.json("deleted");

});
router.get('/activitydelete/:activityname', find_correctactivity, function (req, res) {
    console.log('je komt in de activitydelete route');
    console.log (req.params.activityName);

    activityCollection.findOneAndUpdate(
        {activityName: req.params.activityName},
        {$set: {deleted: true}},
        function (err, model) {
            console.log("dit is een" + err);
        }
    );
    res.json("De activity " + req.params.activityName + "is verwijderd");


});
router.get('/', function(req, res){
    Activity.getActivities(function (activities) {
        res.json({activitielist: activities});
        //console.log(activities)
    });
});

router.get('/activitydetail/:activityName', find_correctactivity, function (req, res) {
    res.json({activity: req.activity});
    /*if(req.user === undefined){
     res.redirect('/#/home')
     }
     else{
     console.log(req.correctuser);
     res.json({correctuser: req.correctuser});
     //res.render('/#/userdetails', {correctuser: req.correctuser});
     //res.redirect('/#/userdetails');
     }*/



});

module.exports = router;
