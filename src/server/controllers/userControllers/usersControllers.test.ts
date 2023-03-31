import { type Response, type Request } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User/User.js";
import {
  type UserStructure,
  type UserCredentials,
} from "../../../types/users/types.js";
import { loginUser, registerUser } from "./usersControllers.js";
import { CustomError } from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

const mockToken = "asdf1234asdf1234";
const mockHashedPassword = "asdf1234asdf1234";

describe("Given a loginUser controller", () => {
  const req = {} as Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >;
  const mockUser: UserCredentials = {
    email: "d0d0@test.com",
    password: "d0d01234",
  };
  describe("When it receives a request with email 'd0d0@test.com' and password 'd0d01234' and the user exists in the database", () => {
    test("Then it should call its response method with status code 200", async () => {
      req.body = mockUser;
      const expectedStatusCode = 200;
      const expectedBodyResponse = { token: mockToken };

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(mockToken);
      await loginUser(req, res as Response, next);

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
      await loginUser(req, res as Response, next);

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
      await loginUser(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When database throws an error", () => {
    test("Then it should call its next method", async () => {
      const error = new Error("Something went wrong");

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(error),
      }));
      await loginUser(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a registerUser controller", () => {
  const req = {} as Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserStructure
  >;

  const mockUser: UserStructure = {
    email: "d0d0@test.com",
    password: "d0d01234",
    username: "Dodo",
  };
  describe("When it receives a request with email 'test@test.com and password'test1234''", () => {
    test("Then it should call its response method with status code 201", async () => {
      req.body = mockUser;
      const expectedStatusCode = 201;

      bcrypt.hash = jest.fn().mockResolvedValue(mockHashedPassword);
      User.create = jest.fn().mockResolvedValue(mockUser);
      await registerUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When database throws an error", () => {
    test("Then it should call its next method", async () => {
      const mockUserNoEmail: UserStructure = { ...mockUser, email: "" };
      const error = new Error("Something went wrong");
      const customError = new CustomError(
        error.message,
        500,
        "There was an issue creating a new user"
      );

      req.body = mockUserNoEmail;
      User.create = jest.fn().mockRejectedValue(error);
      await registerUser(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
