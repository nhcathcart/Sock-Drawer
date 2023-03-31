import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../models/userModel";

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
    next();
  } catch (err) {
    next(err);
  }

  next();
};
