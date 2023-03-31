import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../models/userModel";

const saltRounds = 8;

export const addUser: RequestHandler = (req, res, next) => {
  res.locals.hello = 'hello'
  next();
}


