const express = require("express");
const router = express.Router();
const services = require("../../services/services.js")
const { schema, schemaUpdate } = require("../../services/validation.js");
const {validateBody,validateBodyUpdate} = require("../../services/middleware.js")


router.get("/", services.getContacts);
router.get("/:contactId", services.getContactById);
router.post("/", validateBody(schema),services.addContact);
router.delete("/:contactId", services.deleteContact);
router.put("/:contactId",validateBodyUpdate(schemaUpdate), services.updateContact);

module.exports = router;
