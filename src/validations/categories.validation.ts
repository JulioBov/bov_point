import Joi from 'joi';
import ICategory from '../interfaces/ICategory';
import ISubCategory from '../interfaces/ISubCategory';

export const joiCreateCategory = Joi.object<ICategory>({
  name: Joi.string().min(3).max(250).required().messages({
    'string.empty': '1',
    'string.base': '1',
    'any.required': '1',
    'string.min': '2',
    'string.max': '3',
  }),
  project_id: Joi.string().guid().optional().default(null).messages({ 'string.empty': '5', 'string.guid': '5' }),
});

export const joiCreateSubCategory = Joi.object<ISubCategory>({
  name: Joi.string().min(3).max(250).required().messages({
    'string.empty': '1',
    'string.base': '1',
    'any.required': '1',
    'string.min': '2',
    'string.max': '3',
  }),
  category_id: Joi.string().guid().required().messages({ 'any.required': '5', 'string.empty': '5', 'string.guid': '5' }),
});
