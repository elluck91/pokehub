angular.module('login')
.controller('loginCtrl',[
	'$location',
	'Auth',
	function($location, Auth) {
		var vm = this;

		vm.credentials = {
			email : "",
			password : ""
		};

		vm.onSubmit = function () {
			Auth
				.login(vm.credentials)
				.then(function(response){
					if(response.data['refreshToken']){
						Auth.updateTimer();
						$location.path('view/profile');
					}
				});
		};
	}]);