/**
 * Subscription
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		
		firstName: {

			type: "string",
			required: true
		},

		lastName: {

			type: "string",
			required: true
		},

		email: {
			
			type: "email",
			required: true
		},

		address: {
			
			type: "address",
			required: true
		},

		cep: {
			
			type: "cep",
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
		}
	}

};
