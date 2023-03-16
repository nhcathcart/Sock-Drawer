import express from "express";
import axios from "axios";

const app: express.Application = express();

const port: number = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.json("Hello from the server");
});

app.get("/api/lichess", async (req, res) => {
  let resp = await axios.get(
    "https://lichess.org/api/games/user/nhcathcart",
    {
      params: {
        analyzed: true,
        max: 20,
        tags: true,
        pgnInJson: true,
        moves: true,
        evals: true,
      },
      headers: {
        accept: "application/x-ndjson"
      }
    }
  );
  
  console.log(resp)
  res.json('hi from the server');
});

app.listen(port, () => {
  console.log(`server running on port 3000`);
});
