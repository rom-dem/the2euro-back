import { Router } from "express";
import {
  createCoin,
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
coinsRouters.post(`${endpoints.coins}${endpoints.create}`, createCoin);

export default coinsRouters;
