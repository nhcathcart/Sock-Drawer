import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../models/userModel";
import { User, getUser } from "./reusables";
import { ErrorObject } from "../server";
import { v4 as uuid } from "uuid";

export const addTask: RequestHandler = async (req, res, next) => {
  const { username, newTask, status } = req.body;
  const client = await pool.connect();

  try {
    const query = `INSERT INTO tasks (user_id, status, task_text, notes)
        VALUES ('${username}', '${status}', '${newTask}', ARRAY[]);`;
    await client.query(query);
    return next();
  } catch (err) {
    const errorObj: ErrorObject = {
      log: `There was a problem in the addTask middleware : ${err}`,
      status: 500,
      message: {
        err: "There was a problem adding the task",
      },
    };
    return next(errorObj);
  }
};

export const addSubTask: RequestHandler = async (req, res, next) => {
  const { task_id, subTask } = req.body;
  const client = await pool.connect();

  try {
    const query = `INSERT INTO tasks (task_id, completed, task_text)
        VALUES ('${task_id}', FALSE, '${subTask}')`;
    await client.query(query);
    return next();
  } catch (err) {
    const errorObj: ErrorObject = {
      log: `There was a problem in the addSubTask middleware : ${err}`,
      status: 500,
      message: {
        err: "There was a problem adding the sub task",
      },
    };
    return next(errorObj);
  }
};

export const addNote: RequestHandler = async (req, res, next) => {};
