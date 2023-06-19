const express = require("express");
const { postVerifyUser } = require("../controllers/login-controllers");

const loginRouter = express.Router();

loginRouter.post("/", postVerifyUser);

module.exports = loginRouter;
