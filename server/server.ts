import express from "express";
import {addUser, setCookie} from "./controllers/loginController.js";
import cookieParser from "cookie-parser"


const app: express.Application = express();

const port: number = 3000;

app.use(express.json());
app.use(cookieParser())

app.get("/api", (req, res) => {
  res.json("Hello from the server");
});

app.post("/add-user", addUser, setCookie, (req, res) => {
  res.send('hello')
});

app.post("/login-user", setCookie, (req, res) => {
  res.send('succesful login')
})

app.listen(port, () => {
  console.log(`server running on port 3000`);
});
