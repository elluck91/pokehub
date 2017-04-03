angular.module('register')
	.controller('registerCtrl', [
		'$location',
		'Auth',
		function ($location, Auth) {
			var vm = this;
			vm.credentials = {
				firstName : '',
				lastName : '',
				email : '',
				password : ''
			};

			vm.onSubmit = function () {
				// console.log('Submitting registration');

				var registerBody = vm.credentials;
				registerBody.role = 'User';
				registerBody = {
					user: registerBody,
					registerType: 'Register'
				};
				Auth
					.register(registerBody)
					.then( function(response) {
						if(response.data['message'] === 'Success.') {
							$location.path('view/status/emailSent');
						} else {
							// TODO: Put what happens if a registration fails here
							// $location.path('view/status/errorOccured');	
						}
					}
				);
			};
		}
	]);
