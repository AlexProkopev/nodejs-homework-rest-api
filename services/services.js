const services = require("../models/contacts.js");
const { schema } = require("./validation.js");

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
    const body = Object.keys(req.body).length;
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (body !== 3)
      return res.status(400).json({ message: "missing required name field" });

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
    const body = Object.keys(req.body).length;
    const { contactId } = req.params;
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    if (body === 0) return res.status(400).json({ message: "missing fields" });
    const updateContact = await services.updateContact(contactId, req.body);

    if (!updateContact)
      return res.status(404).json({ message: "Not found id" });

    return res.status(201).json(updateContact);
  } catch (error) {
    next(error);
  }
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.status });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  errorHandler,
};
