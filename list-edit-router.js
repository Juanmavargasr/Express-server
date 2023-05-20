const express = require("express");
const listEditRouter = express.Router();

module.exports = (tasklist) => {
  listEditRouter.post("/create", (req, res) => {
    const newTask = req.body;
    tasklist.push(newTask);
    res.json(newTask);
  });

  listEditRouter.delete("/delete/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasklist.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      const deletedTask = tasklist.splice(index, 1);
      res.json(deletedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });

  listEditRouter.put("/update/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasklist.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasklist[index] = { ...tasklist[index], ...updatedTask };
      res.json(tasklist[index]);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  });

  return listEditRouter;
};
