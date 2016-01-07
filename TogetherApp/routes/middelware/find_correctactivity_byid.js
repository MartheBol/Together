/**
 * Created by Nikita on 7/01/2016.
 */
var mongoose = require('mongoose');
var activitySchema = require('../../schemas/activitySchema.js');
var activityCollection = mongoose.model('Activity', activitySchema, "activities");

function isCorrectActivity(req, res, next) {
    var activityid = req.params.activityid;

    activityCollection.findOne({activityId: activityid}).exec(function(err, activity){

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