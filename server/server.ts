import express from "express";
import axios from "axios";

const app: express.Application = express();

const port: number = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json("Hello from the server");
});

app.listen(port, () => {
  console.log(`server running on port 3000`);
});
