import Joi from "joi";

export const createUserParams = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const loginUserParams = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
