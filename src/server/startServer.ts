import "../loadEnvironments.js";
import createDebug from "debug";
import chalk from "chalk";
import { app } from "./app.js";
import { type CustomError } from "../CustomError/CustomError.js";

const debug = createDebug("the2euro-api:server:startServer");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
      debug(chalk.bgGreen(`Server is listening on http://localhost:${port}`));
    });
    server.on("error", (error: CustomError) => {
      const errorMessage = "Error while starting the server";

      if (error.code === "EADDRINUSE") {
        debug(chalk.bgRed(errorMessage, `The port ${port} is already in use`));
      }

      reject(error);
    });
  });

export default startServer;
