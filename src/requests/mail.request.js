import Joi from 'joi';

export const sendMailSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `A sender name is a required.`
  }),
  email: Joi.string().email().required().messages({
    'any.required': `A sender email is a required.`
  }),
  subject: Joi.string().required().messages({
    'any.required': `A mail subject is a required.`
  }),
  text: Joi.string().required().messages({
    'any.required': `A mail body is a required.`
  }),
  receiver: Joi.string().required().messages({
    'any.required': `A receiver email is a required.`
  })
});
