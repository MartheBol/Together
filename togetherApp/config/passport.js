/**
 * Created by Marthe on 15/12/15.
 */
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/account');
var dateFormat = require('dateformat');


module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id,function(err, user){
            done(err,user);
        })
    });

    passport.use('login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done){
          process.nextTick(function(){
              User.findOne({'username': username}, function(err, user){

                  if(user.deleted === false){
                      if(err){
                       return done(err);
                       }

                       if(!user){
                       return done(null, {error:'Oop! No user found with that username.'});
                       }

                       else{

                       user.validPassword(password, function(err, isMatch){
                       if(err){
                       throw err;
                       }

                       if(isMatch){
                       return done(null, user);
                       }
                       else{
                       return done(null, {error: 'Oops! Wrong password'});
                       }
                       })
                       }
                  }

                  else{
                      return done(null, {error:'Oop! Your account is deleted. Contact the admin.'});
                  }


              })
          })
        }
    ));

    //REGISTER
    passport.use('register', new LocalStrategy({
        usernameField: 'username',
        lastnameField: 'lastname',
        firstnameField: 'firstname',
        zipcodeField: 'zipcode',
        sexField: 'sex',
        birthdateField: 'birthdate',
        passwordField: 'password',
        biographyField: 'biography',
        interests:'interests',
        deleted: 'deleted',
        geolocation:'geolocation',
        timestamp: 'timestamp',
        passReqToCallback:true
    }, function(req, username, password, done){
        process.nextTick(function(){
            if(!req.user){
                User.findOne({username:username}, function(err, user){
                    console.log(user);
                    if(err){
                        return done(err);
                    }

                    if(user){
                        return done(null, {error: 'This username is already taken.'})
                    }
                    else{
                        var newUser = new User();
                        newUser.generateHash(password, function(err, hash){
                            if(err){
                                throw  err
                            }

                            console.log(dateFormat(req.body.birthdate, "yyyy-mm-dd"));

                            var date = dateFormat(req.body.birthdate, "yyyy-mm-dd");

                            newUser.username = req.body.username;
                            newUser.firstname = req.body.firstname;
                            newUser.lastname = req.body.lastname;
                            newUser.zipcode = req.body.zipcode;
                            newUser.sex = req.body.sex;
                            newUser.birthdate = date;
                            newUser.password = hash;
                            newUser.biography = req.body.biography;
                            newUser.interests = req.body.interests;
                            newUser.deleted = 0;
                            newUser.geolocation = req.body.geolocation;
                            newUser.timestamp =  new Date().getTime();
                            console.log(req.body.biography);
                            newUser.save(function(err){
                                if(err){
                                    throw  err
                                }

                                return done(null, newUser);
                            })
                        })
                    }
                })
            }
        })
    }))


};