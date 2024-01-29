require("dotenv").config();
const gravatar = require("gravatar");
const { handleErroreAuth } = require("../helpers/handleErrorAuth.js");
const { User } = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const regist = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email)
    const userCreate = await User.create({
      ...req.body,
      password: hashPassword,
      avatarUrl
    });
    const response = {
      email: userCreate.email,
      subscription: userCreate.subscription,
    };
    res.status(201).json(response);
  } catch (error) {
    handleErroreAuth(error, req, res, next);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Password not corect" });

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });
    await User.findByIdAndUpdate(user._id, { token });
    const response = {
      token,
      user: { email: user.email, subscription: user.subscription },
    };
    res.status(200).json(response);
  } catch (error) {
    next();
  }
};

// Текущий юзер


const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    next();
  }
};
module.exports = { regist, login, logOut };
