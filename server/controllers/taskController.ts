import { NextFunction, RequestHandler, Request, Response } from "express";
import { pool } from "../models/userModel";
import { ErrorObject } from "../server";

export const addTask: RequestHandler = async (req, res, next) => {
  const { username, newTask, status } = req.body;
  const client = await pool.connect();

  try {
    const query = `INSERT INTO tasks (user_id, status, task_text, notes)
        VALUES ('${username}', '${status}', '${newTask}', ARRAY[]);`;
    await client.query(query);
    client.release();
    return next();
  } catch (err) {
    client.release();
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
    const query = `INSERT INTO sub_tasks (task_id, completed, task_text)
        VALUES ('${task_id}', FALSE, '${subTask}')`;
    await client.query(query);
    client.release();
    return next();
  } catch (err) {
    client.release();
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

export const toggleSubTask: RequestHandler = async (req, res, next) => {
    const { id, status } = req.body;
    const client = await pool.connect();

    try {
        const query = `UPDATE sub_tasks
        SET completed = '${status}'
        WHERE id = ${id};`
        await client.query(query);
        client.release();
        return next();
    }catch(err){
        client.release();
        const errorObj: ErrorObject = {
            log: `There was a problem in the toggleSubTask middleware : ${err}`,
            status: 500,
            message: {
              err: "There was a problem toggling the sub task",
            },
          }; 
        return next(errorObj)
    }
}

export const addTaskNote: RequestHandler = async (req, res, next) => {
    const { task_id, newNote } = req.body;
    const client = await pool.connect();

    try{
        const query = `UPDATE sub_tasks
        SET tasks = array_append(tasks, '${newNote}')
        WHERE id = ${task_id};` 
        await client.query(query);
        client.release();
        return next();
    }catch(err){
        client.release();
        const errorObj: ErrorObject = {
            log: `There was a problem in the toggleSubTask middleware : ${err}`,
            status: 500,
            message: {
              err: "There was a problem toggling the sub task",
            },
          }; 
        return next(errorObj)
    }
}

