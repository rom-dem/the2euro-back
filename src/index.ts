import "./loadEnvironments.js";
import mongoose from "mongoose";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";
import createDebug from "debug";

const debug = createDebug("the2euro");

const port = process.env.PORT ?? 4000;
const databaseUrl = process.env.MONGODB_CONNECTION_URL!;

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectDatabase(databaseUrl);
  await startServer(+port);
} catch (error) {
  debug(error);
}
