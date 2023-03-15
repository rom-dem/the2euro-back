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

export const deleteCoinById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    await Coin.findByIdAndDelete({
      _id: id,
      owner: req.owner,
    }).exec();

    res.status(200).json({ message: "Coin deleted!" });
  } catch (error) {
    const customError = new CustomError(
      "Internal server error",
      500,
      "Couldn't delete the coin"
    );
    next(customError);
  }
};
