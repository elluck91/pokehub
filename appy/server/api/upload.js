'use strict';

const AWS = require('aws-sdk');

const Config = require('../../config');

module.exports = function (server, mongoose, logger) {

	server.route( {
			method: 'GET',
			path: '/upload/{names*3}',
			config: {
				handler: function(request, reply) {
					var s3 = new AWS.S3();
					var nameParts = request.params.names.split('/');
					var fileName = nameParts[0];
					var fileType = nameParts[1] + '/' + nameParts[2];
					var s3Params = {
						Bucket: Config.get('/constants/BUCKET_NAME'),
						Key: fileName,
						Expires: 60,
						ContentType: fileType,
						ACL: 'public-read'
					};
					s3.getSignedUrl('putObject', s3Params, (err, data) => {
						if(err){	
							console.log(err);
							return res.end();
						}
						const returnData = {
							signedRequest: data,
							url: 'https://' + Config.get('/constants/BUCKET_NAME') + '.s3.amazonaws.com/' + fileName
						};
						reply(JSON.stringify(returnData));
					});
				},
				tags: ['api'],
				plugins: {
					'hapi-swagger': {}
				}
			}

		});
}
