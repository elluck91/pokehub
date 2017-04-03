angular.module('pokeHubApp')
	.config([
		'$routeProvider',
		'$locationProvider',
		function ($routeProvider, $locationProvider) {
			$routeProvider
				.when('/view', {
					templateUrl: 'view/home/home.template.html',
					controller: 'homeCtrl',
					controllerAs: 'vm'
				})
				.when('/view/register', {
					templateUrl: 'view/register/register.template.html',
					controller: 'registerCtrl',
					controllerAs: 'vm'
				})
				.when('/view/login', {
					templateUrl: 'view/login/login.template.html',
					controller: 'loginCtrl',
					controllerAs: 'vm'
				})
				.when('/view/profile', {
					templateUrl: 'view/profile/profile.template.html',
					controller: 'profileCtrl',
					controllerAs: 'vm'
				})
				.when('/view/status/emailSent', {
					templateUrl: 'view/status/emailSent/emailSent.template.html',
					controller: 'emailSentCtrl',
					controllerAs: 'vm'
				})
				.when('/view/status/userActivated', {
					templateUrl: 'view/status/userActivated/userActivated.template.html',
					controller: 'userActivatedCtrl',
					controllerAs: 'vm'
				})
				.when('/view/status/errorOccurred', {
					templateUrl: 'view/status/errorOccurred/errorOccurred.template.html',
					controller: 'errorOccurredCtrl',
					controllerAs: 'vm'
				})
				.when('/user/activate', {
					redirectTo: '/view/status/userActivated'
				})
				.otherwise({redirectTo: '/view/status/errorOccurred'});

			// use the HTML5 History API
			$locationProvider.html5Mode(true);
		}
	]
);