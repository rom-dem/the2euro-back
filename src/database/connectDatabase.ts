import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("the2euro-api:database");

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    debug("Connected to data base");
  } catch (error: unknown) {
    debug("Check the cables in your internet box");
    throw new Error("Error while connecting to data base");
  }
};

export default connectDatabase;
