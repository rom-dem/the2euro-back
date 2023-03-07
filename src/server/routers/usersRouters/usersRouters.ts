import { Router } from "express";
import { loginUser } from "../../controllers/userControllers/usersControllers.js";

const loginRoute = "/login";

const usersRouters = Router();

usersRouters.post(loginRoute, loginUser);

export default usersRouters;
