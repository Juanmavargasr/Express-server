const tasklist = require("../tasklist.json");
const jwt = require("jsonwebtoken");

const checkInfo = async (req, res, next) => {
  try {
    const { id, taskname, description } = req.body;
    if (!id || !taskname || !description) {
      return res.status(400).json({ error: "Mandatory data missing" });
    }
  } catch (error) {
    console.error("Error checking data", error);
    res.status(500).json({ error: "Error checking data" });
  }
  next();
};

const postListEdit = (req, res) => {
  const newTask = req.body;
  newTask.isCompleted = false;
  tasklist.push(newTask);
  res.json(tasklist);
};

const getListEdit = (req, res) => {
  res.json(tasklist);
};

const getListEditId = (req, res) => {
  try {
    id = req.params.id;
    const requiredTask = tasklist.filter((task) => task.id === id);
    res.json(requiredTask);
  } catch (Error) {
    console.log("error", error);
    res.status(500).json({ error: "Error getting item" });
  }
};

const deleteListEdit = (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasklist.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    const deletedTask = tasklist.splice(index, 1);
    res.json(deletedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

const putListEdit = (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasklist.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasklist[index] = { ...tasklist[index], ...updatedTask };
    res.json(tasklist[index]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

const midJwtValidation = (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"];
    if (!accessToken) {
      res.status(401).json({ error: "User is not loggedIn, please relog" });
    }

    /*Ojo, queda pendiente configurar la variable de entorno trayéndola desde .env
    porque no sé como traerla desde una carpeta externa, por el momento el secreto
    se deja escrito*/
    jwt.verify(accessToken, "process.env.SECRET_KEY", (err, user) => {
      if (err) {
        res.send("access denied, token incorrect or expired");
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "error checking user" });
  }
};

module.exports = {
  postListEdit,
  getListEdit,
  deleteListEdit,
  putListEdit,
  checkInfo,
  getListEditId,
  midJwtValidation,
};
