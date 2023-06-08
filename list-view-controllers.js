const tasklist = require("./tasklist.json");

//CON QUERY
const checkParams = (req, res, next) => {
  try {
    const data = req.query;

    if (
      !data.isCompleted ||
      (data.isCompleted !== "true" && data.isCompleted !== "false")
    ) {
      return res.status(400).json({ error: "Invalid params" });
    }
  } catch (error) {
    console.log("error checking params", error);
    res.status(500).json({ error: "error checking params" });
  }
  next();
};

//CON QUERY
const completedTask = (req, res) => {
  try {
    const data = req.query;

    const fileteredTask = tasklist.filter((task) => {
      return task.isCompleted === (data.isCompleted === "true");
    });
    res.json(fileteredTask);
  } catch (error) {
    console.log("error getting data", error);
    res.status(500).json({ error: "error getting data" });
  }
};

module.exports = {
  completedTask,
  checkParams,
};
