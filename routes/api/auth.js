const express = require("express");
const router = express.Router();
const { validateBody, authenticate, uploadAvatar } = require("../../services/middleware.js");
const { schemas } = require("../../services/validationUser.js");
const { regist, login, logOut } = require("../../services/auth.js");
const { upload } = require("../../services/upload.js");

router.post("/auth/register", validateBody(schemas.registSchema), regist);
router.post("/auth/login", validateBody(schemas.loginSchema), login);
router.post("/auth/logout",authenticate,logOut);
router.get("/current",authenticate,login);
router.patch("/avatars",authenticate, upload.single("avatar"), uploadAvatar);



module.exports = router;
