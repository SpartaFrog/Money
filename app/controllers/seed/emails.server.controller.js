'use strict';

/** 
 * Module dependencies.
 */
var nodemailer = require('nodemailer'),
	env = require('../../../config/env/' + process.env.NODE_ENV),
	smtpTransport = require('nodemailer-smtp-transport');


var transport = nodemailer.createTransport(smtpTransport({
    host: env.mailer.options.service,
    auth: env.mailer.options.auth
}));

// /**
// * Send Email
// */
exports.sendMail = function(name, email, subject, message) {

	var msg = {
		html: message,
		subject: subject,
		from: env.mailer.from,
		to: name + ' <' + email + '>'
	};

	transport.sendMail(msg, function(err){
		if(err){
			console.log('Sending to ' + email + ' failed: ' + err);
		}
	});

	
};

