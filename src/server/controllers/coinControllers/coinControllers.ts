import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import Coin from "../../../database/models/Coin/Coin.js";
import { type CustomRequest } from "../../../types/users/types.js";

export const getCoins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coins = await Coin.find().exec();

    if (!coins) {
      throw new CustomError(
        "Internal server error",
        500,
        "Couldn't find coins"
      );
    }

    res.status(200).json({ coins });
  } catch (error) {
    next(error);
  }
};

export const deleteCoin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { coinId } = req.params;

  try {
    const coin = await Coin.findByIdAndDelete({
      _id: coinId,
      owner: req.owner,
    }).exec();

    if (!coin) {
      throw new CustomError(
        "Internal server error",
        500,
        "Couldn't delete the coin"
      );
    }

    res.status(200).json({ coin });
  } catch (error) {
    next(error);
  }
};
