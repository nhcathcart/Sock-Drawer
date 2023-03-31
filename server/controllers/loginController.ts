import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../models/userModel";
import { v4 as uuid } from "uuid";


interface user {
  username: string;
  passwordhash: string;
  token?: string
}

const saltRounds = 8;

export const addUser: RequestHandler = async (req, res, next) => {
  console.log('here')
  const { username, password } = req.body;
  console.log(username, password)
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const client = await pool.connect();
  try {
    const query = `INSERT INTO users (username, passwordHash) VALUES ('${username}', '${passwordHash}');`;
    await client.query(query);
    console.log('here')
    client.release();
    return next();
  } catch (err) {
    console.log(err)
    client.release();
    return next(err);
  }
};


// export const loginUser: RequestHandler = async (req, res, next) => {
//   const { username, password } = req.body;
//   let queryRes;
//   try{
//     const query = `SELECT * from users WHERE username=${username}`
//     const client = await pool.connect();
//     queryRes = await client.query(query)
//   }catch (err) {
//     return next(err)
//   }
//   try{
//     const { passwordhash } = queryRes[0]
//     const result = await bcrypt.compare(password, passwordhash)
//     if (result) return next();
//     else return next('problem')
//   }catch (err){
//     return next(err)
//   }
// }
export const setCookie: RequestHandler = async (req, res, next) => {
  const cookieName = 'token';
  const cookieValue = uuid();
  const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // The cookie only accessible by the web server toggle
  };
  res.cookie(cookieName, cookieValue, options)

  const { username } = req.body;
  try{
    const query = `UPDATE users SET token = ${cookieValue} WHERE username = ${username};    `
    const client = await pool.connect();
    await client.query(query)
  }catch (err) {
    return next(err)
  }
  return next();
};
