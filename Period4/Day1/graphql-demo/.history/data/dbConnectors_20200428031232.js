import mongoose from "mongoose";

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://fullstack_user:<tran9018>@fullstack-cluster-rkge1.mongodb.net/test?retryWrites=true&w=majority",
  { useMongoClient: true }
);

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
