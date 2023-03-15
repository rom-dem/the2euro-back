import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import Coin from "../../../database/models/Coin/Coin";
import { type CoinData } from "../../../types/coins/types";
import { type CustomRequest } from "../../../types/users/types";
import { deleteCoin, getCoins } from "./coinControllers";

const mockCoin: CoinData = {
  country: "Andorra",
  year: 2004,
  description: "",
  feature: "",
  image: "",
  issuingVolume: 100,
  id: "1",
  owner: "123",
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
      const error = new CustomError(
        "Internal server error",
        500,
        "Couldn't find coins"
      );

      Coin.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(false),
      }));

      await getCoins(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given deleteCoin controller", () => {
  describe("When it receives a request with a coin id to delete", () => {
    test("Then it should call its status method with status code 200 and its json method with the coin object", async () => {
      const req: Partial<CustomRequest> = { params: { id: `${mockCoin.id}` } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockCoin.id),
      };
      const next: NextFunction = jest.fn();
      const expectedStatusCode = 200;

      Coin.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockCoin),
      }));

      await deleteCoin(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: "Coin deleted!" });
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const error = new CustomError("Bad request", 400, "Couldn't find coins");

      const req: Partial<CustomRequest> = { params: { id: `${mockCoin.id}` } };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next: NextFunction = jest.fn();

      Coin.findByIdAndDelete = jest.fn().mockReturnValue(new Error());

      await deleteCoin(req as CustomRequest, res as Response, next);
      const expectedError = new CustomError(
        "Bad request",
        400,
        "Couldn't find coins"
      );

      expect(next).toHaveBeenCalled();
    });
  });
});
