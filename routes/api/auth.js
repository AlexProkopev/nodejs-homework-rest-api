const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../services/middleware.js");
const { schemas } = require("../../services/validationUser.js");
const { regist, login, logOut } = require("../../services/auth.js");

router.post("/users/register", validateBody(schemas.registSchema), regist);
router.post("/users/login", validateBody(schemas.loginSchema), login);
router.post("/users/current",authenticate,validateBody(schemas.loginSchema),login);
router.post("/users/logout",authenticate,logOut);

module.exports = router;
