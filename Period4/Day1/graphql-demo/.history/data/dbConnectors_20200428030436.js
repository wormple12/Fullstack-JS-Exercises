import mongoose from "mongoose";

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://fullstack_user:<tran9018>@fullstack-cluster-rkge1.mongodb.net/test?retryWrites=true&w=majority",
  (useMongoClient: true)
);
