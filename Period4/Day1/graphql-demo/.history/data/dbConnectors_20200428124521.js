import mongoose from "mongoose";
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

// Mongo connection
const CONNECTION =
  "mongodb+srv://fullstack_user:tran9018@fullstack-cluster-rkge1.mongodb.net/graphql_test?retryWrites=true&w=majority";
mongoose.connect(CONNECTION, {
  useUnifiedTopology: true,
  useNewURLParser: true,
});

const friendSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  language: {
    type: String,
  },
  email: {
    type: String,
  },
  contacts: {
    type: Array,
  },
});

const Friends = mongoose.model("friends", friendSchema);

export { Friends };
