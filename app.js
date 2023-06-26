const express = require("express");
const tasklist = require("./src/tasklist.json");
const port = 3002;
const app = express();
app.use(express.json());

const listViewRouter = require("./src/routes/list-view-router");
const listEditRouter = require("./src/routes/list-edit-router");
const loginRouter = require("./src/routes/login-router");

app.listen(port, () => {
  console.log(`server listening in port ${port}`);
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

app.use("/login", loginRouter);

app.use("/list-edit", listEditRouter);

app.use("/list-view", listViewRouter);

// app.use("*", (req, res) => {
//   res.status(404).send("Error 404: Ruta no encontrada");
// });

app.get("/", (req, res) => {
  res.json("Hello to tasklist app, go to /list-edit for check");
});

module.exports = app;
