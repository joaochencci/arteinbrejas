var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
    to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

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

			// one user only... easy task


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
			
		}
	}
};
