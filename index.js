// const { request } = require("express");
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send({ Hi: "there" });
});

app.listen(5000);
