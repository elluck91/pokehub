angular.module('core.uploadFile')
.service('UploadFile', [
	'Auth',
	'$http',
	function UploadFile(Auth, $http){
		var self = this;

		/*
		Function to carry out the actual PUT request to S3 using the signed request from the app.
		*/
		this.putOnS3 = function(file, signedRequest, url){
			const xhr = new XMLHttpRequest();
			xhr.open('PUT', signedRequest, true);
			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4){
					if(xhr.status === 200){
						alert('Uploaded ' + file.name + ' to S3\n' + url);
						return Auth.createFile(file, url)
						.then(function(res) {
							Auth.updateTimer()
						})
						console.log(url);
					}
					else{
						alert('Could not upload file.');
					}
				}
			};
			xhr.send(file);
		};

		/*
		Function to get the temporary signed request from the app.
		If request successful, continue to upload the file using this signed
		request.
		*/
		this.uploadToS3 = function(file){

			const xhr = new XMLHttpRequest();
			xhr.open('GET', '/upload/' + file.name + '/' + file.type);
			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4){
					if(xhr.status === 200){
						const response = JSON.parse(xhr.responseText);
						self.putOnS3(file, response.signedRequest, response.url);
						
					} else {
						alert('Could not get signed URL.');
					}
				}
			};
			xhr.send();
		};

		
		
	}]
);
