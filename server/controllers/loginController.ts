import { NextFunction } from "express";
import { db } from "../models/userModel";

interface loginController {
  createUser: Function;
  validateUser: Function;
}

const loginController: loginController = {
  createUser: function (req: Request, res: Response, next: NextFunction) {

  },
  validateUser: function (req: Request, res: Response, next: NextFunction) {
    
  },
};
