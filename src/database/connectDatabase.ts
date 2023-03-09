import createDebug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";

const debug = createDebug("the2euro-api:database");

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    debug(chalk.bgGreenBright("Connected to data base"));
  } catch (error: unknown) {
    debug("Check the cables in your internet box", (error as Error).message);
  }
};

export default connectDatabase;
