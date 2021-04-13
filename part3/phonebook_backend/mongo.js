const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const contactName = process.argv[3] || null;
const contactNumber = process.argv[4] || null;

const url = `mongodb+srv://fso_user:${password}@fsocluster0.4nmn3.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (contactName && contactNumber) {
  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  });

  contact.save().then(() => {
    console.log(`added ${contactName} number ${contactNumber} to phonebook`);
    mongoose.connection.close();
  });
}
else {
  Contact.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
