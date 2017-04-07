angular.module('profile')
.controller('profileCtrl', [
	'$http',
	'Auth',
	function profileCtrl($http, Auth, UploadFile) {
		var vm = this;

		vm.firstName = Auth.getFirstName();
		vm.lastName = Auth.getLastName();

	}
]);