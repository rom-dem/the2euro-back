import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/userControllers/usersControllers.js";
import loginSchema from "../../schemas/loginSchema.js";
import { endpoints } from "../endpoints.js";

const usersRouters = Router();

usersRouters.post(
  endpoints.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouters;
