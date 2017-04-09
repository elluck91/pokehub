angular.module('profile')
.controller('profileCtrl', [
	'$http',
	'Auth',
	'UploadFile',
	'$scope',
	function profileCtrl($http, Auth, $scope) {
		var vm = this;
		vm.firstName = Auth.getFirstName();
		vm.lastName = Auth.getLastName();

	}
]);
