/**
 * Created by Marthe on 28/11/15.
 */
var gulp = require("gulp"),
    csslint = require("gulp-csslint"),
    cssMinifier = require("gulp-minify-css"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    notify = require("gulp-notify"),
    uglify = require("gulp-uglify"),
    ngmin = require('gulp-ngmin'),
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    nodemon = require('gulp-nodemon'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha'),
    autoprefixer = require('gulp-autoprefixer');


var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('mocha_test_uitvoeren', function () {
    return gulp.src(['tests/*.js'] , { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task("default", function(){
  gulp.watch("./public/less/**/*.less", ['less']);
  gulp.watch([
      "./public/config/config.js",
      "./public/app.js",
      "./public/javascripts/exceptions/**/*.js",
      "./public/javascripts/models/**/*.js",
      "./public/javascripts/services/**/*.js",
      "./public/javascripts/controllers/**/*.js",
      "./public/javascripts/viewmodels/**/*.js"
  ], ['js']);
});
gulp.task("js", function(){
  gulp.src([
    "./public/config/config.js",
    "./public/app.js",
    "./public/javascripts/exceptions/**/*.js",
    "./public/javascripts/models/**/*.js",
    "./public/javascripts/services/**/*.js",
    "./public/javascripts/controllers/**/*.js",
    "./public/javascripts/viewmodels/**/*.js"
    ])
      .pipe(jshint())
      .pipe(jshint.reporter(jsStylish))
      .pipe(sourcemaps.init())
      .pipe(concat("app.min.js"))
      .pipe(ngmin())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./public/dist/js"))
      .pipe(notify({
        message:"js built"
      }));

});

gulp.task("less", function(){
   gulp.src("./public/stylesheets/*.less")
       .pipe(less({
           compress: true
       }).on('error', gutil.log))
       .pipe(autoprefixer('last 2 versions', 'ie9'))
       .pipe(cssMinifier({keepBreaks: false}))
       .pipe(concat('site.min.css'))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest("./public/dist/css"))
       .pipe(notify({
           message:"less built"
       }));
});

gulp.task('serve', ['js', 'less'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');

        })
});

gulp.task("watch", function(){
    gulp.watch("./public/stylesheets/*.less", ["less"])
});