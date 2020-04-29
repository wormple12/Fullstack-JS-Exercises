import mongoose from "mongoose";
import { Friends } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    createFriend: ({ input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDatabase[id] = input;
      return new Friend(id, input);
    },
  },
};
