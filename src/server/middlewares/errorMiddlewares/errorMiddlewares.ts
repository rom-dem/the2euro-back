import createDebug from "debug";
import { ValidationError } from "express-validation";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";

const debug = createDebug("the2euro-api:server:middlewares:errorMiddlewares");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError("Endpoint not found", 404, "Path not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrors = error.details
      .body!.map((joiError) => joiError.message)
      .join(" & ");
    error.publicMessage = validationErrors;
    debug(validationErrors);
  }

  debug(error.message);

  const statusCode = error.statusCode || 500;
  const publicMessage = error.publicMessage || "Something went wrong";

  res.status(statusCode).json({ error: publicMessage });
};
