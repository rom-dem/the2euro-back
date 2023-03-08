import { Joi } from "express-validation";

const loginSchema = {
  body: Joi.object({
    email: Joi.string().min(5).required(),
    password: Joi.string().min(8).max(24).required(),
  }),
};

export default loginSchema;
