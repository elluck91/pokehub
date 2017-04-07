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
					}
					else{
						alert('Could not upload file.');
					}
				}
			};
			xhr.send(file);
			console.log(url);
			return url;
		};

		/*
		Function to get the temporary signed request from the app.
		If request successful, continue to upload the file using this signed
		request.
		*/
		this.uploadToS3 = function(file){
			const xhr = new XMLHttpRequest();
			var pathfile = '';
			xhr.open('GET', '/upload/' + file.name + '/' + file.type);
			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4){
					if(xhr.status === 200){
						const response = JSON.parse(xhr.responseText);
						self.putOnS3(file, response.signedRequest, response.url);
						debugger
						createFile(file, response.url);
						
					} else {
						alert('Could not get signed URL.');
					}
				}
			};
			xhr.send();
			return pathfile;
		};

		function createFile(file, filepath) {
			var postData = {
				name: file.name,
				type: file.type,
				path: filepath
				
			};
			return $http.post('/file', postData)
				.then(function(result) {
					var params = {
						body : 
					}
					return $http.get('/user/' + Auth.getId() + '/file')
						.then(function(result) {
							console.log(result);
						})
						.catch(function(error) {
							console.log(error);
						})

				})
				.then(function(result) {
					console.log(result);
				})
				.catch(function(error) {
					console.log(error);
				})

		
		}

		this.getAllFiles = function() {
			var params = {
				$embed : 'users'
			}
			return $http.get('/file')
				.then(function(result) {
					console.log(result);
				})
				.catch(function(error) {
					console.log(error);
				})
		}

		this.getUserFiles = function() {
			var params = {
				$embed : 'files',
			}
			var id = Auth.getId();
			return $http.get('/user/' + id)
				.then(function(result) {
					console.log(result);
				})
				.catch(function(error) {
					console.log(error);
				})
		}



		this.addFileToUser = function(file, Auth) {

		}
	}]
);
