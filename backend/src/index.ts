const express = require("express");
const cors = require("cors");
const app = express();
import { userRouter } from "./routes/user";
import { minerRouter } from "./routes/miner";

app.use(express.json());
app.use("/*", cors());

app.get("/", (req: any, res: any) => {
  res.status(200).json({ msg: "Hello" });
});

app.use("/user", userRouter);
app.use("/miner", minerRouter);

app.listen(5000);
