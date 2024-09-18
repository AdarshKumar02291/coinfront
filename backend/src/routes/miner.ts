const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECTRET = "harkirat";
export const minerRouter = express();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

minerRouter.post("/signup", async (req: any, res: any) => {
  const { username, password } = req.body;

  const miner = await prisma.miner.create({
    data: {
      username,
      password,
    },
  });
  console.log(miner);
  res.status(200).json({ msg: "miner role assigned" });
});

minerRouter.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;

  const miner = await prisma.miner.findFirst({
    where: {
      username,
      password,
    },
  });

  if (miner) {
    const token = jwt.sign(
      {
        userId: miner.id,
      },
      JWT_SECTRET
    );
    return res.status(200).json({ token: token ,user : miner.username });
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

minerRouter.get("/", (req: any, res: any) => {
  res.status(200).json({ msg: "Hello from user api" });
});
