import * as Joi from 'joi';
export const countryCodeSchema = Joi.string()
	.trim()
	.regex(/^\+[1-9]\d{1,3}$/)
	.required()
	.messages({
		'string.pattern.base':
			'Country code must be a valid country code starting with a "+" sign and 1 to 4 digits',
		'string.empty': 'Country code is required',
	});

export const phoneSchema = Joi.number().min(10).required().messages({
	'string.min': 'Phone number must be at least 10 characters long',
	'string.empty': 'Phone number is required',
});

export const phoneWithCountryCodeSchema = Joi.string()
	.trim()
	.regex(/^\+(?:1|\d{1,14})$/)
	.required()
	.messages({
		'string.pattern.base':
			'Phone number must be a valid phone number with country code',
		'string.empty': 'Phone number is required',
	});
