import { Joi } from "express-validation";

const registerSchema = {
  body: Joi.object({
    email: Joi.string().min(5).required(),
    password: Joi.string().min(8).max(24).required(),
    username: Joi.string().min(3).required(),
  }),
};

export default registerSchema;
