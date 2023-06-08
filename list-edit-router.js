const express = require("express");
const {
  getListEdit,
  postListEdit,
  deleteListEdit,
  putListEdit,
  checkInfo,
  getListEditId,
} = require("./list-edit-controllers");
// const { tasklist } = require("../proyecto-integrador-Express-1/tasklist");

const listEditRouter = express.Router();

listEditRouter.post("/", checkInfo, postListEdit);
listEditRouter.get("/", getListEdit);
listEditRouter.get("/:id", getListEditId);
listEditRouter.delete("/:id", deleteListEdit);
listEditRouter.put("/:id", checkInfo, putListEdit);

module.exports = listEditRouter;
