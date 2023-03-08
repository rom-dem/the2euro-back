import { type NextFunction, type Request, type Response } from "express";
import { ValidationError, type errors } from "express-validation";
import { CustomError } from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

const req = {} as Request;
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its next method", () => {
      notFoundError(req, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a response and an error with status 500", () => {
    test("Then it should call its status method with 500", () => {
      const statusCode = 500;
      const error = new CustomError("", 500, "");

      generalError(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When it receives a response and an error with the message 'Something went wrong'", () => {
    test("Then it should call its message method with the message 'Something went wrong'", () => {
      const errorMessage = "Something went wrong";
      const error = new CustomError(errorMessage, 0, "");

      generalError(error, req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("When it receives a response and an error from validation because no email was provided", () => {
    test("Then it should call its message method with the message '\"email\" is not allowed to be empty'", () => {
      const error: errors = {
        body: [
          {
            name: "ValidationError",
            isJoi: true,
            annotate(stripColors) {
              return "";
            },
            _original: "",
            message: "'email' is not allowed to be empty",
            details: [
              {
                message: "",
                path: [""],
                type: "",
              },
            ],
          },
        ],
      };
      const publicMessage = "'email' is not allowed to be empty";
      const validationError = new ValidationError(error, {});

      generalError(
        validationError as unknown as CustomError,
        req,
        res as Response,
        next
      );

      expect(res.json).toHaveBeenCalledWith({ error: publicMessage });
    });
  });
});
