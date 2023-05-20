const express = require("express");
const port = 3000;
const app = express();

const tasklist = [
  {
    id: 1,
    taskname: "Task1",
    description: "description task 1",
    isCompleted: false,
  },
  {
    id: 2,
    taskname: "Task2",
    description: "description task 2",
    isCompleted: true,
  },
];

const listViewRouter = require("./list-view-router")(tasklist); //Aquí se le pasa el parámetro tasklist al router listViewRouter
const listEditRouter = require("./list-edit-router")(tasklist);

app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

app.listen(port, () => {
  console.log(`server listening in port ${3000}`);
});

app.get("/", (req, res) => {
  res.json(tasklist);
});

module.exports = app;
