import "../loadEnvironments.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import usersRouters from "./routers/usersRouters/usersRouters.js";
import coinsRouters from "./routers/coinsRouters/coinsRouters.js";
import { endpoints } from "./routers/endpoints.js";

export const app = express();

app.disable("x-powered-by");

const allowedOrigins = [
  process.env.CORS_ALLOWED_PRODUCTION!,
  process.env.CORS_ALLOWED_PRODUCTION_1!,
  process.env.CORS_ALLOWED_LOCAL!,
  process.env.CORS_ALLOWED_LOCAL_1!,
  process.env.CORS_ALLOWED_LOCAL_2!,
];

const corsOptions: cors.CorsOptions = { origin: allowedOrigins };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use(endpoints.users, usersRouters);
app.use(endpoints.root, coinsRouters);

app.use(notFoundError);
app.use(generalError);
