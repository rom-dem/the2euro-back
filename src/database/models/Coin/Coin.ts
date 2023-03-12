import { model, Schema } from "mongoose";

const coinSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  issuingVolume: {
    type: Number,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Coin = model("Coin", coinSchema, "coins");

export default Coin;
