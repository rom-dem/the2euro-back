import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import Coin from "../../../database/models/Coin/Coin.js";

export const getCoins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coins = await Coin.find().exec();

    res.status(200).json({ coins });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't find coins"
    );

    next(customError);
  }
};
