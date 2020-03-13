import { Response } from "express";

const simpleLogger = function(req: any, res: Response, next: Function) {
  console.log(new Date().toLocaleString(), req.method, req.originalUrl);
  next();
};

export default simpleLogger;
