require("dotenv").config(); // ENVIRONMENT VARIABLES
import express from "express";
import path from "path";
const app = express();
const helmet = require("helmet"); // SECURITY
import UserFacade from "./facades/userFacade";

app.use(helmet());

app.use(express.static(path.join(process.cwd(), "public")));
// add security middleware

app.get("/api/users", (req, res) => {
  const users = UserFacade.getAllUsers();
  res.json(users);
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
