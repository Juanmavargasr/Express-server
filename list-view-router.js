const express = require("express");
const { completedTask, checkParams } = require("./list-view-controllers");

const listViewRouter = express.Router();

listViewRouter.get("/status", checkParams, completedTask);

module.exports = listViewRouter;
