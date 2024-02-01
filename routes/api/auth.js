const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../services/middleware.js");
const { schemas } = require("../../services/validationUser.js");
const { regist, login, logOut, currentUser } = require("../../services/auth.js");

router.post("/register", validateBody(schemas.registSchema), regist);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current",authenticate,currentUser);
router.post("/logout",authenticate,logOut);

module.exports = router;
