const express = require("express");
const router = express.Router();
const { validateBody, authenticate } = require("../../services/middleware.js");
const { schemas } = require("../../services/validationUser.js");
const { regist, login, logOut } = require("../../services/auth.js");

router.post("/auth/register", validateBody(schemas.registSchema), regist);
router.post("/auth/login", validateBody(schemas.loginSchema), login);
router.get("/current",authenticate,login);
router.post("/auth/logout",authenticate,logOut);

module.exports = router;
