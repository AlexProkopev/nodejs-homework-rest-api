const express = require("express");
const router = express.Router();
const services = require("../../services/services.js")
const { schema, schemaUpdate,schemaUpdateStatus } = require("../../services/validation.js");
const {validateBody,validateBodyUpdate,validateBodyUpdateStatus, authenticate} = require("../../services/middleware.js")

router.get("/", authenticate, services.getContacts);
router.get("/:contactId",authenticate, services.getContactById);
router.post("/",authenticate, validateBody(schema),services.addContact);
router.delete("/:contactId",authenticate, services.deleteContact);
router.put("/:contactId",authenticate, validateBodyUpdate(schemaUpdate), services.updateContact);
router.patch("/:contactId/favorite",authenticate, validateBodyUpdateStatus(schemaUpdateStatus), services.updateStatusContact);

module.exports = router;
