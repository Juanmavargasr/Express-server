const express = require("express");
const {
  completedTask,
  checkParams,
} = require("../controllers/list-view-controllers");

const listViewRouter = express.Router();

listViewRouter.get("/status", checkParams, completedTask);

module.exports = listViewRouter;
