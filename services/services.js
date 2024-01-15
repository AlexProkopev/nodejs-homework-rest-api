const services = require("../models/contacts.js");

const getContacts = async (req, res, next) => {
  const contacts = await services.listContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await services.getContactById(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await services.addContact(req.body);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const index = await services.removeContact(contactId);
    if (!index) return res.status(404).json({ message: "Not found" });
    return res.status(204).json({ message: `contact deleted` });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await services.updateContact(contactId, req.body);
    if (!updateContact)
      return res.status(404).json({ message: "Not found id" });
    return res.status(201).json(updateContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res,next) => {
 try {
  const { contactId } = req.params;
  const result = await services.updateStatusContact(contactId, req.body);
  if (!result) res.status(404).json({ message: "missing field favorite" });
  res.json(result);
 } catch (error) {
  next(error);
 }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact
};
