import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/userControllers/usersControllers.js";
import loginSchema from "../../schemas/loginSchema.js";

const loginRoute = "/login";

const usersRouters = Router();

usersRouters.post(
  loginRoute,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouters;
