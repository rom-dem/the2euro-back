import "../loadEnvironments.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import usersRouters from "./routers/usersRouters/usersRouters.js";

export const app = express();

app.disable("x-powered-by");

const allowedOrigins = [
  process.env.CORS_ALLOWED_LOCAL!,
  process.env.CORS_ALLOWED_PRODUCTION!,
];

const corsOptions: cors.CorsOptions = { origin: allowedOrigins };

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouters);

app.use(notFoundError);
app.use(generalError);
