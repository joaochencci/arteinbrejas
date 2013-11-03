/**
 * SubscriptionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var subscriptionValues = {

	'plan1': "59",
	'plan2': "79",
}

module.exports = {

	checkout: function(req, res) {

		Subscription
			.findOne({id: req.param("id")})
			.done(function(err, s) {

				if(err)
					res.redirect("/?subscription_error")
					//res.redirect("/subscription/error");

				else {

					if(!s.coupon || !s.coupon.length) {
						res.redirect("/pagseguro/redir?value=" + subscriptionValues[s.type]);
						return;
					}

					else {

						Coupon.findByCode(req.param("code")).done(function (err, coupons) {

							if (err || coupons.length == 0) {

								res.redirect("/pagseguro/redir?value=" + subscriptionValues[s.type]);
								return;

							} else {

								var val = subscriptionValues[s.type]
								val = val * coupons[0].value;

								res.redirect("/pagseguro/redir?value=" + val);
								return;
							}
						});

					}
				}
			});
	}
};
