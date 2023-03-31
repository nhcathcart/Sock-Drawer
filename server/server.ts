import express from "express";
import {addUser} from "./controllers/loginController.js";
import cookieParser from "cookie-parser"


const app: express.Application = express();

const port: number = 3000;

app.use(express.json());
app.use(cookieParser())

app.get("/api", (req, res) => {
  res.json("Hello from the server");
});

app.post("/add-user", addUser,  (req, res) => {
  res.send('hello')
});


app.listen(port, () => {
  console.log(`server running on port 3000`);
});
