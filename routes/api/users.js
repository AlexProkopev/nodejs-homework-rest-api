const express = require("express");
const router = express.Router();
const { authenticate } = require("../../services/middleware.js");
const { currentUser } = require("../../services/auth.js");

router.get(
    "/current",
    authenticate,
    currentUser
  );

  module.exports = router
  