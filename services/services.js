const Contacts = require("../models/contactsSchema.js");

const getContacts = async (req, res, next) => {
  const {_id: owner} = req.user;
  const contacts = await Contacts.find({owner},"-createAt -updatedAt");
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  try {
   
    const { contactId } = req.params;
    const contact = await Contacts.findById(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const newContact = await Contacts.create({...req.body, owner});
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const index = await Contacts.findByIdAndDelete(contactId);
    if (!index) return res.status(404).json({ message: "Not found" });
    return res.status(204).json({ message: `contact deleted` });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateContact = await Contacts.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updateContact)
      return res.status(404).json({ message: "Not found id" });
    return res.status(201).json(updateContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }).select("-createdAt -updatedAt");
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
  updateStatusContact,
};
