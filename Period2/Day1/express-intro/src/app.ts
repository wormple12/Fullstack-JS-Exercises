require("dotenv").config(); // ENVIRONMENT VARIABLES
import express from "express";
import path from "path";
const app = express();
const Joi = require("joi");
const helmet = require("helmet"); // SECURITY
import UserFacade from "./facades/userFacade";

app.use(helmet());

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
// add security middleware

app.get("/api/users", (req, res) => {
  const users = UserFacade.getAllUsers();
  res.json(users);
});

app.get("/api/user/:username", (req, res) => {
  try {
    const user = UserFacade.getUser(req.params.username);
    res.json(user);
  } catch (Error) {
    res.status(404).send(Error.message);
  }
});

app.post("/api/user", (req, res) => {
  const requirements = {
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  };
  const result = Joi.validate(req.body, requirements);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const wasAdded = UserFacade.addUser(result.value);
  res.send(`${result.value.userName} was added: ${wasAdded}`);
});

app.delete("/api/user/:username", (req, res) => {
  try {
    const wasDeleted = UserFacade.deleteUser(req.params.username);
    res.send(`${req.params.username} was deleted: ${wasDeleted}`);
  } catch (Error) {
    res.status(404).send(Error.message);
  }
});

// for testing checkUser method:
/* app.get("/api/users/check", (req, res) => {
  res.send(UserFacade.checkUser("john@turturro.com", "1234"));
}); */

UserFacade.addUser({
  name: "John",
  userName: "john@turturro.com",
  password: "1234",
  role: "user"
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);
console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;
