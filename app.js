const express = require("express");
const tasklist = require("./tasklist.json");
const port = 3000;
const app = express();

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.listen(port, () => {
  console.log(`server listening in port ${3000}`);
});

app.use(express.json());

app.use((req, res, next) => {
  try {
    const valideRequest = ["GET", "POST", "PUT", "DELETE"];
    const method = req.method.toUpperCase();
    if (!valideRequest.includes(method)) {
      return res.status(400).json({ error: "Not allowed method" });
    }
  } catch (error) {
    console.error("Error checking methods", error);
    res.status(500).json({ error: "Error checking methods" });
  }
  next();
});

app.use("/list-edit", listEditRouter);

app.use("/list-view", listViewRouter);

app.use("*", (req, res) => {
  res.status(404).send("Error 404: Ruta no encontrada");
});

app.get("/", (req, res) => {
  res.json("Hello to tasklist app, go to /list-edit for check");
});

module.exports = app;
