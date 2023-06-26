const users = require("../users.json");
const jwt = require("jsonwebtoken");

const postVerifyUser = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ error: "email and password are needed" });
    }

    const verifyEmail = users.findIndex((e) => e.email === email);
    if (verifyEmail === -1) {
      res.status(401).json({ error: "Invalid username or password" });
    }
    const userPassword = users[verifyEmail].password;

    if (password !== userPassword) {
      res.status(401).json({ error: "Invalid username or password" });
    }

    const userUsername = users[verifyEmail].username;

    const user = {
      email: email,
      username: userUsername,
    };

    /*Ojo, queda pendiente configurar la variable de entorno trayéndola desde .env
    porque no sé como traerla desde una carpeta externa, por el momento el secreto
    se deja escrito*/
    const generateAccessToken = (user) => {
      return jwt.sign(user, "process.env.SECRET_KEY", { expiresIn: "5m" });
    };

    const accessToken = generateAccessToken(user);

    res.header("authorization", accessToken).json({
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Error checking the user" });
  }
};

module.exports = {
  postVerifyUser,
};
