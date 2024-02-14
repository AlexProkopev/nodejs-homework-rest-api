require("dotenv").config();
const { generateNanoId } = require("../helpers/generateId.js");
const { handleErroreAuth } = require("../helpers/handleErrorAuth.js");
const { sendEmail } = require("../helpers/senderEmail.js");
const { User } = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const regist = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) return res.status(409).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateNanoId();

    const userCreate = await User.create({
      ...req.body,
      name,
      password: hashPassword,
      verificationToken,
    });
    const verefyEmail = {
      to: email,
      subject: "Verefy email",
      html: `<a target="" href="${process.env.BASE_URl}/api/users/verify/${verificationToken}">Click verefy email</a>`,
    };

    await sendEmail(verefyEmail);

    const response = {
      email: userCreate.email,
      subscription: userCreate.subscription,
    };

    res.status(201).json(response);
  } catch (error) {
    handleErroreAuth(error, req, res, next);
  }
};

const verefyEmail = async (req, res, next) => {
  const { verificationCode } = req.params;
  try {
    const user = await User.findOne({ verificationCode });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found" });

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    res.status(200).json({ message: "Verification code is valid" });
  } catch (error) {
    res.status(401).json({ message: "Not Verification" });
  }
};

const resendVerefyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email not found" });
    if (user.verify)
      return res.status(400).json({ message: "Verification has already been passed" });
    const verificationToken = generateNanoId();

    const verefyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="" href="${process.env.BASE_URl}/api/users/verify/${verificationToken}">Click verefy email</a>`,
    };

    await User.findByIdAndUpdate(user._id, {
      verificationToken,
    });

    await sendEmail(verefyEmail);

    res.status(201).json({ message: "Verify email sent" });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Password not correct" });

    if (!user.verify)
      return res.status(401).json({ message: "User not verified" });
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
    res.status(401).json({ message: "Not authorized" });
  }
};

// Текущий юзер

const currentUser = async (req, res, next) => {
  try {
    const { user } = req;
    const response = {
      email: user.email,
      subscription: user.subscription,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

const logOut = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
module.exports = {
  regist,
  login,
  currentUser,
  logOut,
  verefyEmail,
  resendVerefyEmail,
};
