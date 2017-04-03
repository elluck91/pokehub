'use strict';

module.exports = function (server, mongoose, logger) {
	server.route({	
		method: 'GET',
		path: '/view',
		config: {
			handler : function(request, reply) {
			reply.file('./view/index.html');
			},
			tags: ['api'],
			plugins: {
				'hapi-swagger': {}
			}
		}
	});

    server.route({
		method: 'GET',
		path: '/view/{static*}',
		config: {
			handler: {
				directory: {
					path: 'view',
					index: true
				}
			},
			tags: ['api'],
			plugins: {
				'hapi-swagger': {}
			}
			
		}
	});
};