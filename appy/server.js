'use strict';

const RestHapi = require('rest-hapi');
const Composer = require('./index');

Composer((err, server) => {

  if (err) {
    throw err;
  }
  
	/*	If the response is an error, redirect to the home page.
		
		TODO: This is a catch-all. You can react to specific
		errors by inspecting the request object below.
		
		Notable Errors:
			POST, /register, status: '409', Email in use
			ANY, /any, status: '403', forbidden

		Maybe pass the response to the error page and have that page
		display the output (statusCode, message).
	*/
	server.ext('onPreResponse', function (request, reply) {
		if(request.response.output){
			// If the client tries to access a page they are not supposed to, 
			// then redirect to /view.
		    if (request.response.output.statusCode === 403) {
		        return reply.redirect('/view');
		    }

		    // Not Found.
		    if (request.response.output.statusCode === 404) {
		        return reply.redirect('/view');
		    }

		    // Internal server error.
		    if (request.response.output.statusCode === 500) {
		        return reply.redirect('/view');
		    }
		}

	    return reply.continue();
	});

  server.start(() => {
    RestHapi.logUtil.logActionComplete(RestHapi.logger, "Server Initialized", server.info);
  });
});
