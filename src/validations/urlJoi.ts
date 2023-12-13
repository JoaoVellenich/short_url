import Joi from "joi";

export const shortedUrlSchema = Joi.string().required().max(6).min(6);
