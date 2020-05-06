import express from "express";
import graphqlHTTP from "express-graphql";
import { schema } from "./data/schema";
import path from "path";
require("dotenv").config({ path: path.join(process.cwd(), ".env") });
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("GraphQL is amazing!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Running server on port localhost:${PORT}/graphql`)
);
