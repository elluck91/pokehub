angular.module('profile')
.controller('profileCtrl', [
	'$http',
	'Auth',
	function profileCtrl($http, Auth) {
		var vm = this;

		vm.firstName = Auth.getFirstName();
		vm.lastName = Auth.getLastName();
	}
]);