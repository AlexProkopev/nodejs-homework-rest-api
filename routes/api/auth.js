const express = require("express");
const router = express.Router();
const { validateBody, authenticate} = require("../../services/middleware.js");
const { schemas } = require("../../services/validationUser.js");
const { regist, login, logOut, currentUser, verefyEmail, resendVerefyEmail } = require("../../services/auth.js");
const { upload } = require("../../services/upload.js");
const { uploadAvatar } = require("../../services/uploadAvatar.js");


router.post("/register", validateBody(schemas.registSchema), regist);
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/logout",authenticate,logOut);
router.get("/current",authenticate,currentUser);
router.patch("/avatars",authenticate, upload.single("avatar"), uploadAvatar);
router.get("/verify/:vereficationCode",verefyEmail)
router.post("/verify",validateBody(schemas.schemaEmail),resendVerefyEmail)


module.exports = router;
