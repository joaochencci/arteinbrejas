/**
 * Coupon
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

		code: {
			type: "string",
			required: true
		},

		limit: {
			type: "integer",
			required: false
		},

		sold: {
			type: "integer",
			required: true
		},

		expires: {
			type: "datetime",
			required: false
		}
	}
};
