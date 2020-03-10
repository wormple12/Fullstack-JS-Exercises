require("dotenv").config();
import express from "express";
import path from "path";
//import corsHandler from "./middlewares/my-cors";
//import simpleLogger from "./middlewares/simpleLogger";
const Cors = require("cors");
import { requestLogger, errorLogger } from "./middlewares/logger";
const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());

app.use(Cors);
//app.use(corsHandler);
app.use(requestLogger);

let userAPIRouter = require("./routes/userApi");
app.use("/api/users", userAPIRouter);

app.use(errorLogger, function(err: any, req: any, res: any, next: Function) {
  res.status(500).json(err);
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
