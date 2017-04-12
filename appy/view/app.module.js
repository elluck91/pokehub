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
		$http.defaults.headers.common.Authorization = Auth.getToken();
		var config = {
			url: '/user/' + Auth.getId(),
			method: 'GET',
		};

		return $http(config)
			.then(function successCallback(response) {
				if(response.status === 200){
					var token = Auth.getToken()
					Auth.saveToken(token);
					Auth.updateTimer();
					$location.path('/view/profile');
				}
				else
					$location.path('/view');
			}, function errorCallback(response) {
				console.log(response);
			});
	}]);
