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
					var token = Auth.getToken()
					Auth.saveToken(token);
					$location.path('view/profile');
				}
				else
					$location.path('view');
			}, function errorCallback(response) {
				console.log(response);
			});
	}]);
