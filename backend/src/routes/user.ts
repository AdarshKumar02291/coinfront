const express = require("express");
export const userRouter = express();

userRouter.get("/", (req: any, res: any) => {
  res.status(200).json({ msg: "Hello from user api" });
});
