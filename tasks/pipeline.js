/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'bower_components/angular/angular-csp.css',
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  
  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Load foundations version of Modernizr
  'bower_components/foundation/js/vendor/modernizr.js',
  
  // Dependencies like jQuery, or Angular are brought in here

  // Load Angular
  'bower_components/angular/angular.js',

  // Load Angular UI router and Statehelper
  'bower_components/angular-ui-router/release/angular-ui-router.min.js',
  //'bower_components/angular-ui-router.stateHelper/stateHelper.min.js',

  // Load Angular UI Utils
  'bower_components/angular-ui-utils/ui-utils.min.js',

  // Load Angular Data & CacheFactory
  'bower_components/angular-data/dist/angular-data.min.js',
  'bower_components/angular-cache/dist/angular-cache.min.js',

  // Load Angular MD5
  //'bower_components/angular-md5/angular-md5.min.js',

  // Load Angular Sails
  'bower_components/angularSails/dist/ngsails.io.js',

  // Load Angular Permission
  'bower_components/angular-permission/dist/angular-permission.js',

  //Load Angular Filters
  'bower_components/angular-filter/dist/angular-filter.min.js',
  
  // Load Angular Animations
  'bower_components/angular-animate/angular-animate.min.js',

  // Load Angular Foundation
  'bower_components/angular-foundation/mm-foundation-tpls.min.js',
  
  // Load Angular Progress
  'bower_components/ngprogress/build/ngProgress.min.js',

  // Load Moment and Angular Moment
  'bower_components/moment/moment.js',
  'bower_components/angular-moment/angular-moment.min.js',

  // Load Lodash
  'bower_components/lodash/dist/lodash.min.js',
  'bower_components/angular-lodash/angular-lodash.js',
  
  // Load Angular Idle
  'bower_components/ng-idle/angular-idle.min.js',

  // Load Angular Payments (Stripe)
  'bower_components/angular-payments/lib/angular-payments.min.js',

  
  // Load Angular Gravatar
  'bower_components/angular-gravatar/build/md5.min.js',
  'bower_components/angular-gravatar/build/angular-gravatar.min.js',
  // Load D3
  'bower_components/d3/d3.min.js',

  // Load C3
  'bower_components/c3/c3.min.js',
  'bower_components/angular-c3/dist/c3-chart.js',


  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'app/**/*.tpl.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
