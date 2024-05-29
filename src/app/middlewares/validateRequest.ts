import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("before asynch", req.body);
      const data = await schema.parseAsync({
        body: req.body,
      });

      console.log("After", data);

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
