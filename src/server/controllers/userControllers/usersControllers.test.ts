import { type Response, type Request } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User.js";
import { type UserCredentials } from "../../types.js";
import { loginUser } from "./usersControllers.js";
import { CustomError } from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a loginUser controller", () => {
  const mockUser: UserCredentials = {
    email: "d0d0@test.com",
    password: "d0d01234",
  };
  describe("When it receives a request with email 'd0d0@test.com' and password 'd0d01234' and the user exists in the database", () => {
    test("Then it should call its response method with status code 200", async () => {
      req.body = mockUser;
      const expectedStatusCode = 200;
      const mockToken = "asdf1234asdf1234";
      const expectedBodyResponse = { token: mockToken };

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(mockToken);
      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a request with email 'd0d0@test.com' and password 'd0d01234' and the user does not exist in the database", () => {
    test("Then it should call its next method with status code  401 and the message 'Wrong credentials'", async () => {
      req.body = mockUser;
      const expectedError = new CustomError(
        "No user with this email",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));
      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with email 'd0d0@test.com' and password 'd0d01234' and the user exists in the database but the password is wrong", () => {
    test("Then it should call its next method with status code  401 and the message 'Wrong password'", async () => {
      req.body = mockUser;
      const expectedError = new CustomError(
        "Wrong password",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When database throws an error", () => {
    test("Then it should call its next method", async () => {
      const error = new Error("Something went wrong");

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(error),
      }));
      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
