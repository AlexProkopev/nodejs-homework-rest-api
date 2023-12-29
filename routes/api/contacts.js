const express = require("express");
const router = express.Router();
const services = require("../../services/services.js")


router.get("/", services.getContacts);
router.get("/:contactId", services.getContactById);
router.post("/", services.addContact);
router.delete("/:contactId", services.deleteContact);
router.put("/:contactId", services.updateContact);

module.exports = router;
