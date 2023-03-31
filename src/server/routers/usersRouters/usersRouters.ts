import { Router } from "express";
import { validate } from "express-validation";
import {
  loginUser,
  registerUser,
} from "../../controllers/userControllers/usersControllers.js";
import loginSchema from "../../schemas/loginSchema.js";
import { endpoints } from "../endpoints.js";
import registerSchema from "../../schemas/registerSchema.js";

const usersRouters = Router();

usersRouters.post(
  endpoints.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

usersRouters.post(
  endpoints.register,
  validate(registerSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouters;
