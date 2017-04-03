angular.module('pokeHubApp', [
	'ngRoute',
	'ngFileUpload',
	'core',
	'status',
	'home',
	'login',
	'register',
	'profile'
	])
	.run(['$http', '$location', 'Auth', function($http, $location, Auth) {
		var config = {
			url: '/user/' + Auth.getId(),
			method: 'GET',
			headers: {
				authorization: Auth.getToken(),
			}
		};

		return $http(config)
			.then(function successCallback(response) {
				if(response.status === 200){
					$location.path('view/profile');
				}
			}, function errorCallback(response) {
				console.log(response);
			});
	}]);
