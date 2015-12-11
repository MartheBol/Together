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
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task("default", function(){
  gulp.watch("./public/less/**/*.less", ['css']);
  gulp.watch(["./public/config/config.js",
    "./public/exceptions/**/*.js",
    "./public/models/**/*.js",
    "./public/javascripts/services/**/*.js",
    "./public/viewmodels/**/*.js",
  ], ['js']);
});
gulp.task("js", function(){
  gulp.src(["./public/config/config.js",
    "./public/exceptions/**/*.js",
    "./public/models/**/*.js",
    "./public/javascripts/services/**/*.js",
    "./public/javascripts/controllers/**/*.js",
    "./public/viewmodels/**/*.js",
    "./public//app.js"])
      .pipe(jshint())
      .pipe(jshint.reporter(jsStylish))
      .pipe(sourcemaps.init())
      .pipe(concat("app.min.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./public/dist/js"))
      .pipe(notify({
        message:"jsbuilt"
      }));

});

gulp.task("css", function(){
  gulp.src("./public/stylesheets/**/*.less")
      .pipe(less())
    /*.pipe(csslint({
     'ids': false
     }))
     .pipe(sourcemaps.init())
     .pipe(cssMinifier())
     .pipe(concat("site.css"))
     .pipe(sourcemaps.write())*/
      .pipe(gulp.dest("./public/dist/css"))
      .pipe(notify({
        message:"css built"
      }));

  /**
   * sourcemaps -->
   * alleen nodig om te debuggen
   * link naar files staan in de sourcemaps
   * */
});

gulp.task('serve', ['js', 'css'], function () {
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