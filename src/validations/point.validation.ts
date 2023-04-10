import Joi from 'joi';
import IPoint from '../interfaces/IPoint';

export const joiCreatePoint = Joi.array()
  .required()
  .items(
    Joi.object<IPoint>({
      // HH:MM:SS
      time: Joi.string()
        .pattern(/^((?!00:00:00)([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])|(24:00:00)$/)
        .required()
        .messages({
          'string.empty': '9',
          'string.base': '9',
          'any.required': '9',
          'string.pattern.base': '8',
        }),
      // YYYY-MM-DD
      date: Joi.string()
        .pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
        .required()
        .messages({
          'any.required': '10',
          'string.pattern.base': '10',
        }),
      category_id: Joi.when('sub_category_id', {
        is: null,
        then: Joi.string().guid().required().messages({ 'any.required': '12', 'string.empty': '11', 'string.guid': '11' }),
        otherwise: Joi.string().default(null),
      }),
      sub_category_id: Joi.string().guid().optional().default(null).messages({ 'string.empty': '12', 'string.guid': '12' }),
    }).messages({
      'array.base': '13',
      'any.required': '13',
    })
  );
