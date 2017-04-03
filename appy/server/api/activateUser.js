'use strict';
var http = require('http');

module.exports = function (server, mongoose, logger) {
	server.route({	
		method: 'GET',
		path: '/user/activate',
		config: {
			handler : function(request, reply) {
				var options = {
					method: 'GET',
					hostname: 'localhost',
					port: 8000,
					path: '/register/activate?token=' + request.query["token"],
					agent: false,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					}
				};
				var req = http.request(options, (res) => {
					console.log(`STATUS: ${res.statusCode}`);
					console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
					res.setEncoding('utf8');
					res.on('data', (chunk) => {
						console.log(`BODY: ${chunk}`);
					});
					res.on('end', () => {
						console.log('No more data in response.');
						if(res.statusCode == 200) {
							reply.file('view/index.html')
						} else {
							reply.redirect('/view/');
						}
					});
				})

				req.on('error', (e) => {
					console.log(`problem with request: ${e.message}`);
				})
				req.end();
			}
		}
	});
};