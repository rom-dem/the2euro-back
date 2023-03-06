import "../loadEnvironments.js";
import createDebug from "debug";
import { app } from "./app.js";

const debug = createDebug("the2euro:server:startServer");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
      debug(`Server is listening on http://localhost:${port}`);
    });
    server.on("error", (error: Error) => {
      const errorMessage = "Error starting the server";
      reject(new Error(errorMessage));
    });
  });

export default startServer;
