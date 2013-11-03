/**
 * Subscription
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		
		name: {

			type: "string",
			required: true
		},

		email: {
			
			type: "email",
			required: true
		},

		address: {
			
			type: "string",
			required: true
		},

		cep: {
			
			type: "string",
			required: true
		},

		state: {
			
			type: "string",
			required: true
		},

		city: {
			
			type: "string",
			required: true
		},
		
		type: {
			
			type: "string",
			required: true
		},

		coupon: {
			
			type: "string",
			required: false
		}
	}

};
