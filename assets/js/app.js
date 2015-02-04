angular.module( 'cms', [
	'ui.router',
	'ui.utils',
	'angular-data.DS',
	'angular-data.DSCacheFactory',
	'sails.io',
	//'angular-md5',
	'permission',
	//'ng.group',
	'angular.filter',
	'ngAnimate',
	'mm.foundation',
	'angularMoment',
	'angular-lodash',
	'ngIdle',
	'ngProgress',
	'angularPayments',
	'ui.gravatar',
	'angular-c3',

	
	//CMS
	'templates-app',
	//'cms.services',
	//'cms.models',
	//'cms.directives',
	//'cms.controllers',
	//'cms.modals',
	
])
.config( function AppConfig ( $stateProvider, $urlRouterProvider, $locationProvider, $tooltipProvider) {
	//console.log('running');
	//$urlRouterProvider.when('', '/manage');
	
	//$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise(function ($injector, $location, $state) {
		
		console.log($location);
		console.log($location.$$url);

		if ($location.$$url === '/') {
			console.log("to home");
			//$state.go('dashboard');
			window.location = '/home';
		}else {
			console.log('send to server');
			// pass through to let the web server handle this request
			window.location = $location.$$absUrl;
		}
	});
	
	//console.log($tooltipProvider);

	//Set Tool Tip
	var options = {
		appendToBody : true
	}

	$tooltipProvider.options(options);

})

.config(['$keepaliveProvider', '$idleProvider', function($keepaliveProvider, $idleProvider) {
  $idleProvider.idleDuration(60);
  $idleProvider.warningDuration(60);
  $keepaliveProvider.interval(60);

}])

.run(['DS', 'DSSailsSocketAdapter', function (DS, DSSailsSocketAdapter) {
  // register the adapter with the data store
  DS.adapters.DSSailsSocketAdapter = DSSailsSocketAdapter;
  // set your custom adapter as the default
  DS.defaults.defaultAdapter = 'DSSailsSocketAdapter';

}])

.run(['$idle', function($idle) {
  $idle.watch();
  moment.lang('en');

}])

;
