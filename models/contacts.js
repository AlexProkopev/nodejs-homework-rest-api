const Contacts = require("./contactsSchema.js");
// const fs = require("fs/promises");
// const path = require("path");
// const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await Contacts.find()
  return contacts;
};

const getContactById = async (contactId) => {
  // const contacts = await listContacts();
  // const findContact = contacts.find((contact) => contact.id === contactId);
  const findContact = await Contacts.findById(contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  // const contacts = await listContacts();
  // const index = contacts.findIndex((contact) => contact.id === contactId);
  // if (index === -1) return null;
  // contacts.splice(index, 1);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const index = await Contacts.findByIdAndDelete(contactId);
  return index;
};

const addContact = async ({ name, email, phone }) => {
  // const id = Math.floor(Math.random() * 1000000).toString();
  // const contacts = await listContacts();
  // const newContact = {
  //   id,
  //   name,
  //   email,
  //   phone,
  // };

  // contacts.push(newContact);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const newContact = await Contacts.create({ name, email, phone });
  return newContact;
};

const updateContact = async (contactId, body) => {
  // const contacts = await listContacts();
  // const findContact = contacts.find((contact) => contact.id === contactId);
  // const updateContact = { ...findContact, ...body };

  // const index = contacts.findIndex((contact) => contact.id === contactId);
  // if (index === -1) return null;
  // contacts[index] = updateContact;
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  const updateContact = await Contacts.findByIdAndUpdate(
    contactId,
    body,
    { new: true }
  );
  return updateContact;
};

const updateStatusContact = async (contactId, body) => {

  const favoriteContacts = await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
  }).select("-createdAt -updatedAt");

  return favoriteContacts
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
