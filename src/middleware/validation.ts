import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

export const schemas = {
  userRegister: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  
  userSettings: Joi.object({
    settings: Joi.object().pattern(
      Joi.string(),
      Joi.string()
    ).required()
  }),

  questionnaireSubmission: Joi.object({
    answers: Joi.object().pattern(
      Joi.string(),
      Joi.string()
    ).required()
  })
}; 