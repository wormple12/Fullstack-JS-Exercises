import mongoose from "mongoose";

// Mongo connection
const CONNECTION =
  "mongodb+srv://fullstack_user:tran9018@fullstack-cluster-rkge1.mongodb.net/test?retryWrites=true&w=majority";
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

const alienSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planet: {
    type: String,
  },
});

const Friends = mongoose.model("friends", friendSchema);
const Aliens = mongoose.model("aliens", alienSchema);

export { Friends, Aliens };
