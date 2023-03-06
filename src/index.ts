import "./loadEnvironments.js";
import mongoose from "mongoose";
import connectDatabase from "./database/connectDatabase.js";

const port = process.env.PORT ?? 4000;
const databaseUrl = process.env.MONGODB_CONNECTION_URL!;

await connectDatabase(databaseUrl);
