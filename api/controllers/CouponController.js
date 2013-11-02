/**
 * CouponController
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

module.exports = {

	validate: function(req, res) {

		if(!req.param("code")) {
			res.json({
				result: "error",
				message: "code not valid"
			})
		}
		else {

			Coupon.findByCode(req.param("code")).done(function (err, coupons) {

				if (err || coupons.length == 0) {

					res.json({
						result: "error",
						message: "code not valid"
					})

				} else {

					res.json({
						result: "success",
						message: "valid code!",
						value: coupons[0].value
					})

				}
			});

		}

	}
  
};
