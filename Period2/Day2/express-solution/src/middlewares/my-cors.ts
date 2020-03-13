import { Response } from "express";

const corsHandler = function(req: any, res: Response, next: Function) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

export default corsHandler;
