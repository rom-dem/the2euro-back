import { type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Coin from "../../../database/models/Coin/Coin";
import { type CoinData } from "../../../types/coins/types";
import { getCoins } from "./coinControllers";

const mockCoin: CoinData = {
  country: "Andorra",
  year: 2004,
  description: "",
  feature: "",
  image: "",
  issuingVolume: 100,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given getCoins controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call its status method with status code 200", async () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      const expectedStatusCode = 200;

      Coin.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockCoin),
      }));

      await getCoins(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();
      const error = new CustomError("Bad request", 400, "Couldn't find coins");
      const expectedError = new CustomError(
        "Bad request",
        400,
        "Couldn't find coins"
      );

      Coin.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(error),
      }));
      await getCoins(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
