/**
 * Created by Marthe on 30/12/15.
 */
var mongoose = require('mongoose');
var activitySchema = require('../../schemas/activitySchema.js');
var activityCollection = mongoose.model('Activity', activitySchema, "activities");

function isCorrectActivity(req, res, next) {
    var activityName = req.params.activityName;

    activityCollection.findOne({activityName: activityName}).exec(function(err, activity){

        if(err){return next(err)}
        if(activity){
            req.activity = activity;
            next();
        }
        else{
            res.redirect('/#/home');


        }
    })

}

module.exports = isCorrectActivity;