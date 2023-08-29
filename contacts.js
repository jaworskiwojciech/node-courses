const fs = require("node:fs").promises;
const { nanoid } = require("nanoid");
const path = require("node:path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getContactsJSON() {
  let contacts = [];
  await fs
    .readFile(contactsPath, "utf8")
    .then((response) => {
      contacts = JSON.parse(response);
    })
    .catch((error) => console.log(error.message));
  return contacts;
}

async function listContacts() {
  const content = await getContactsJSON();
  console.log("Lista kontaktów:");
  console.table(content);
}

async function getContactById(contactId) {
  const contacts = await getContactsJSON();
  const matchedContact = contacts.filter((contact) => contact.id === contactId);
  console.log("Wybrany kontakt:");
  console.table(matchedContact);
}

async function removeContact(contactId) {
  const contacts = await getContactsJSON();
  const contactToDelete = contacts.filter(
    (contact) => contact.id === contactId
  );
  const restOfContacts = contacts.filter((contact) => contact.id !== contactId);
  console.log("Właśnie usunięto:");
  console.table(contactToDelete);
  fs.writeFile(contactsPath, JSON.stringify(restOfContacts));
  console.log("Zaktualizowana lista kontaktów:");
  console.table(restOfContacts);
}

async function addContact(name, email, phone) {
  const contacts = await getContactsJSON();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(`Dodano ${name} do listy kontaków!`);
  console.log("Zaktualizowana lista kontaktów:");
  console.table(contacts);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
