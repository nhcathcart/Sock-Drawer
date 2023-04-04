import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../models/userModel";
import { ErrorObject } from "../server";
import { v4 as uuid } from "uuid";
import {User, getUser} from "./reusables"
const saltRounds = 8;

export const addUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordhash = await bcrypt.hash(password, salt);
  const client = await pool.connect();
  try {
    const query = `INSERT INTO users (username, passwordhash) VALUES ('${username}', '${passwordhash}');`;
    await client.query(query);
    client.release();
    return next();
  } catch (err) {
    client.release();
    const errorObj: ErrorObject = {
      log: "There was an error in the addUser middleware",
      status: 500,
      message: {
        err: "There was a problem adding the user",
      },
    };
    return next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const client = await pool.connect();
  let queryRes;
  try {
    queryRes = await getUser(client, username);
    client.release();
  } catch (err) {
    client.release();
    const errorObj: ErrorObject = {
      log: "There was an error in the loginUser middleware",
      status: 500,
      message: {
        err: "There was a problem logging in the user",
      },
    };
    return next(errorObj);
  }
  try {
    const { passwordhash } = queryRes;
    const result = await bcrypt.compare(password, passwordhash);
    if (result) return next();
    else throw "incorrect password";
  } catch (err) {
    const errorObj: ErrorObject = {
      log: "There was an error in the loginUser middleware",
      status: 500,
      message: {
        err:
          err === "incorrect password"
            ? "incorrect password"
            : "There was a problem loggin in the user",
      },
    };
    return next(errorObj);
  }
};
export const setCookie: RequestHandler = async (req, res, next) => {
  const cookieName = "token";
  const cookieValue = uuid();
  const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // The cookie is only accessible by the web server toggle
  };
  res.cookie(cookieName, cookieValue, options);

  const { username } = req.body;
  try {
    const query = `UPDATE users
    SET token = '${cookieValue}'
    WHERE username = '${username}';
    `;
    const client = await pool.connect();
    await client.query(query);
    client.release();
    return next();
  } catch (err) {
    const errorObj: ErrorObject = {
      log: "There was an error in the setCookie middleware",
      status: 500,
      message: {
        err: "There was a problem",
      },
    };
    return next(err);
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
  const { username } = req.body;
  const client = await pool.connect();
  try{
      const queryRes = await getUser(client, username);
      if (queryRes.token != req.cookies.token) throw 'not authorized';
      else return next();
  }catch(err){
    const errorObj: ErrorObject = {
      log: 'There was an error in the checkAuth middleware',
      status: 500,
      message: {
        err: err==='not authorized'? 'not authorized' : 'There was a problem'
      }
    }
    return next(errorObj);
  }
}
