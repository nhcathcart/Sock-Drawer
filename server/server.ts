import express from "express";
import { addUser, setCookie, loginUser, checkAuth } from "./controllers/loginController.js";
import { addTask, addSubTask, toggleSubTask } from "./controllers/taskController.js";
import {Request, Response, NextFunction} from "express"
import cookieParser from "cookie-parser"


const app: express.Application = express();

const port: number = 3000;

app.use(express.json());
app.use(cookieParser())

app.get("/api", (req, res) => {
  res.json("Hello from the server");
});

app.post("/add-user", addUser, setCookie, (req, res) => {
  res.send('successfully added user')
});

app.post("/login-user", loginUser, setCookie, (req, res) => {
  res.send('succesful login')
})

app.post("/add-task", checkAuth, addTask, (req, res) => {
  res.send('succesfully added task')
})

app.post("/add-sub-task", checkAuth, addSubTask, (req, res) => {
  res.send('successfully added subTask')
})

app.post("/toggle-sub-task", checkAuth, toggleSubTask, (req, res) => {
  res.send('successfully toggled subTask')
})

//global error handler
export interface ErrorObject {
  log: string;
  status: number;
  message: { err: string}
}
app.use((err: ErrorObject, req: Request, res: Response, next: NextFunction) => {
  const defautErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defautErr);
  errorObj.message.err = err.message.err;
  errorObj.log = err.log;
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`server running on port 3000`);
});
