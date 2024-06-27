import "module-alias/register";
import "./lcu/pseudo-local-storage";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { EnvChecker } from "@/helpers";
import { SocketHandler } from "./socket";
import { FOLDER_NAME_DOWNLODED_CONENT } from "@/globals";

dotenv.config();
new EnvChecker().init();

const app = express();

const httpServer = createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
  })
);

app.use(
  "/public",
  express.static(path.join(__dirname, FOLDER_NAME_DOWNLODED_CONENT))
);

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("LCU Client...");
});

SocketHandler.getInstance(httpServer);

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server ready on port ${process.env.SERVER_PORT}.`);
});

export { httpServer };
