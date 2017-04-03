angular.module('core.menu')
.component('menuBar', {
	templateUrl: 'view/core/menu/menu.template.html',
	controller: [
		'$window',
		'$location',
		'Auth',
		function menuBarCtrl($window, $location, Auth) {
			var vm = this;
			vm.onClick = function() {
				if($window.localStorage['token'] !== undefined){
					Auth.logout();
					$location.path('/view');
				}
			}
		}
	],
	controllerAs: 'vm'
});