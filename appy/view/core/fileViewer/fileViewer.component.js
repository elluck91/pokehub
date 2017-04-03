angular.module('core.fileViewer')
.component('fileViewer', {
	templateUrl: 'view/core/fileViewer/fileViewer.template.html',
	controller: [
		'$scope',
		'$timeout',
		'Upload',
		'UploadFile',
		'Auth',
		function fileViewerCtrl($scope, $timeout, Upload, UploadFile, Auth) {
			var vm = this;
			$scope.$watch('files', function (files) {
				if(files && files.length) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						if (!file.$error) {
							console.log(UploadFile.uploadToS3(file));
							
						}
					}
				}
			});
		}],
	controllerAs: 'vm'
});
