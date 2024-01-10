const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  return findContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return index;
};

const addContact = async ({ name, email, phone }) => {
  const id = Math.floor(Math.random() * 1000000).toString();
  const contacts = await listContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  const updateContact = { ...findContact, ...body };

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  contacts[index] = updateContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
