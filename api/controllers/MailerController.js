var FROM_EMAIL = "Arte In Beer <b2beer.startup@gmail.com>"
var DEFAULT_SUBJECT = "Sua Assinatura - Cervejas Artesanais"

var nodemailer = require("nodemailer");

var MailerRenderer = function() {

	var _this = this;
	_public = _this.exports = {};

	_this.smtpTransport = null;

	_public.render = function(template, data) {

		var ejs = require('ejs');
		var fs = require('fs');
		var file = fs.readFileSync(__dirname + '../../views/mailer/' + template + ".ejs", 'ascii');
		return ejs.render(file, data || {});
	}

	_public.send = function(opt) {

		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: FROM_EMAIL,
			to: opt.to,
			subject: obt.subject || DEFAULT_SUBJECT,
			html: _public.render(opt.template, opt.data)
		}

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, function(error, response){

			if(error) {
		    	console.log(error);
			}

			else {
		    	console.log("Message sent: " + response.message);
			}
		});
	};

	_this.init = function() {

		// create reusable transport method (opens pool of SMTP connections)
		_this.smtpTransport = nodemailer.createTransport("SMTP",{
		    service: "Gmail",
		    auth: {
		        user: "b2beer.startup@gmail.com",
		        pass: "vamoganharessaporra"
		    }
		});

		return _this.exports;
	};

	_public.destroy = function(){
		smtpTransport.close();
	}

	return _this.init();
};

module.exports = {

	send: function(req, res) {

		var template = req.param("template") || req.cookies.template || null;

		if(!template) {

			res.json({
				result: "error",
				message: "template not specified"
			})

			return;
		}

		var user = req.param("user_id") || req.cookies.user_id;

		if(user) {

			Subscription
				.findOne({id: user})
				.done(function(err, users) {

					if(err || !users || !users.length) {

						res.json({
							result: "error",
							message: "subscription not found"
						})

						return;
					}

					// one user only... easy task
					var mailerRenderer = new MailerRenderer();

					mailerRenderer.send({
						to: users[0].email,
						subject: req.param("subject") || DEFAULT_SUBJECT,
						template: "index",
						data: user[0]
					})

					mailerRenderer.destroy();
				})
		}

		else {

			// all user... beware!
			// TODO: unhardcode this
			if(!req.param("access_token") || req.param("access_token") != "joaogato") {

				res.json({
					result: "error",
					message: "forbidden"
				})

				return;
			}

			Subscription
				.find()
				.done(function(err, users) {

					if(err || !users || !users.length) {

						res.json({
							result: "error",
							message: "subscription not found"
						})

						return;
					}

					var mailerRenderer = new MailerRenderer();

					for(var i = 0; i < users.length; i++) {
						mailerRenderer.send({
							to: users[0].email,
							subject: req.param("subject") || DEFAULT_SUBJECT,
							template: "index",
							data: user[0]
						})
					}

					mailerRenderer.destroy();
					return;
				})
		}
	},

	index: function(req, res) {
		res.view();
	}
};
