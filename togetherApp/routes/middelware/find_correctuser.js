/**
 * Created by Marthe on 22/12/15.
 */
var mongoose = require('mongoose');
var userSchema = require('../../schemas/userSchema.js');
var userCollection = mongoose.model('User', userSchema, "users");

function isCorrectUser(req, res, next) {
    var userdelete = req.params.username;
    userCollection.findOne({username: userdelete}).exec(function(err, userdelete){


        if(err){return next(err)}
        if(userdelete & userdelete.username != 'admin'){



                req.correctuser = userdelete;
                next();

            //req.correctuser = null;

        }
        else{
            console.log('gebruiker bestaat niet');
            res.redirect('/#/home');

        }
    })
}

module.exports = isCorrectUser;