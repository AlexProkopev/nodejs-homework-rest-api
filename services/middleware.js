require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { SECRET_KEY } = process.env;

const validateBody = (schema) => (req, res, next) => {
  const body = Object.keys(req.body).length;
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  if (body === 0) return res.status(400).json({ message: "missing fields" });

  next();
};

const validateBodyUpdate = (schema) => (req, res, next) => {
  const body = Object.keys(req.body).length;
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  if (body === 0)
    return res.status(400).json({ message: "missing required name field" });

  next();
};

const validateBodyUpdateStatus = (schema) => (req, res, next) => {
  const body = Object.keys(req.body).length;
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });
  if (body < 1)
    return res.status(400).json({ message: "missing field favorite" });

  next();
};

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    if (!id) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  validateBody,
  validateBodyUpdate,
  validateBodyUpdateStatus,
  authenticate,
};
