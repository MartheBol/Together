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
    if (!req.body.activityName || !req.body.dateFrom || !req.body.dateUntil) {
         res.json({ error: 'All fields are required' });
    }else{
        //newActivity.image = req.body.fileinput;

        var newActivity = new Activity({
            activityName :req.body.activityName,
            zipcode :req.body.zipcode,
            street: req.body.street,
            number: req.body.number,
            description :req.body.description,
            fromDate : req.body.dateFrom,
            untilDate : req.body.dateUntil,
            timestamp : req.body.timestamp,
            user : req.user.username,
            image:req.body.image
        });
        console.log(newActivity);

        newActivity.save(function(err, newAct) {
            if (err)  console.error(err);
            console.dir(newAct);
        });
         res.json("hallo")
    }
});

router.get('/', function(req, res){
    Activity.getActivities(function (activities) {
        res.json({activitielist: activities});
        //console.log(activities)
    });
});

router.get('/activitydetail/:activityName', find_correctactivity, function (req, res) {
    res.json({activity: req.activity})
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
