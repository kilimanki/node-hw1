const contactsService = require("./db");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log(allContacts);

    case "getById":
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contactsService.addContact({
        name,
        phone,
        email,
      });
      return console.log(newContact);

    case "remove":
      const result = await contactsService.deleteContact(id);
      console.log(result);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
