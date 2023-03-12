import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDatabase from "../../../database/connectDatabase.js";
import User from "../../../database/models/User/User.js";
import { app } from "../../app.js";
import { CustomError } from "../../../CustomError/CustomError.js";
import { type UserCredentials } from "../../../types/users/types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST `/the2euro/login` endpoint", () => {
  const loginUrl = "/the2euro/login";
  const mockUser: UserCredentials = {
    email: "d0d0@test.com",
    password: "d0d01234",
  };

  describe("When it receives an email 'd0d0@test.com' and a password 'd0d01234' and they exist in the database", () => {
    test("Then it should respond with status 200 and a property 'token' in its body object", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "asdf1234asdf1234",
      }));
      const expectedStatusCode = 200;
      const saltLength = 8;
      const hashedPassword = await bcrypt.hash(mockUser.password, saltLength);

      await User.create({
        ...mockUser,
        username: "Dodo",
        password: hashedPassword,
      });

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives an email 'd0d0d0@test.com' and a password 'd0d01234' and they don't exist in the database", () => {
    test("Then it should call its next method with public message 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "No user with this email",
        401,
        "Wrong credentials"
      );
      const expectedStatusCode = expectedError.statusCode;

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", "Wrong credentials");
    });
  });

  describe("When it receives an email 'd0d0@test.com' and a wrong password 'd0d09876'", () => {
    test("Then it should call its next method with public message 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "Wrong password",
        401,
        "Wrong credentials"
      );
      const expectedStatusCode = expectedError.statusCode;
      const wrongPassword = "d0d09876";
      const saltLength = 8;
      const hashedPassword = await bcrypt.hash(wrongPassword, saltLength);

      await User.create({
        ...mockUser,
        username: "Dodo",
        password: hashedPassword,
      });
      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(
        "error",
        expectedError.publicMessage
      );
    });
  });
});
