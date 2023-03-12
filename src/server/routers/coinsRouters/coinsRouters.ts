import { Router } from "express";
import { getCoins } from "../../controllers/coinControllers/coinControllers.js";

const coinsRoute = "/coins";

const coinsRouters = Router();

coinsRouters.get(coinsRoute, getCoins);

export default coinsRouters;
