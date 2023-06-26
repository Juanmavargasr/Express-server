const express = require("express");
const {
  completedTask,
  checkParams,
} = require("../controllers/list-view-controllers");

const { midJwtValidation } = require("../controllers/list-edit-controllers");

const listViewRouter = express.Router();

listViewRouter.get("/status", midJwtValidation, checkParams, completedTask);

module.exports = listViewRouter;
