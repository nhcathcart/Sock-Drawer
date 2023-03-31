import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../models/userModel";
import { v4 as uuid } from "uuid";

const saltRounds = 8;

export const addUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  try {
    const client = await pool.connect();
    const query = `INSERT INTO users (username, passwordHash) VALUES (${username}, ${passwordHash});`;
    await client.query(query);
    client.release();
    return next();
  } catch (err) {
    return next(err);
  }
};


export const loginUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
}
export const setCookie: RequestHandler = (req, res, next) => {
  const cookieName = 'token';
  const cookieValue = uuid();
  const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // The cookie only accessible by the web server toggle
  };
  res.cookie(cookieName, cookieValue, options)
  return next();
};
