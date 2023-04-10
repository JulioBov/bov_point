import Joi from 'joi';
import IProject from '../interfaces/IProject';

export const joiCreateProject = Joi.object<IProject>({
  name: Joi.string().min(3).max(250).required().messages({
    'string.empty': '1',
    'string.base': '1',
    'any.required': '1',
    'string.min': '2',
    'string.max': '3',
  }),
});
