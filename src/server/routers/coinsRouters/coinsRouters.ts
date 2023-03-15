import { Router } from "express";
import {
  deleteCoinById,
  getCoins,
} from "../../controllers/coinControllers/coinControllers.js";
import { endpoints } from "../endpoints.js";

const coinsRouters = Router();

coinsRouters.get(endpoints.coins, getCoins);
coinsRouters.delete(
  `${endpoints.coins}${endpoints.delete}${endpoints.byId}`,
  deleteCoinById
);

export default coinsRouters;
