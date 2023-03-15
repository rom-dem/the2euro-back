import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectDatabase from "../../../database/connectDatabase";

import { app } from "../../app";
import { endpoints } from "../endpoints";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a GET '/coins' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and a property 'coins' in its body object", async () => {
      const getCoinUrl = endpoints.coins;
      const expectedStatusCode = 200;

      const response = await request(app)
        .get(getCoinUrl)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("coins");
    });
  });
});
