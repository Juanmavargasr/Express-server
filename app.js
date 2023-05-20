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
];

app.listen(port, () => {
  console.log(`server listening in port ${3000}`);
});

app.get("/", (req, res) => {
  res.json(tasklist);
});
