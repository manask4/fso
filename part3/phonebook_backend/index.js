require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/person");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("data", (request) => JSON.stringify(request.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

// get all contacts
app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});

// get single contact
app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// delete a single contact
app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// create a new contact
app.post("/api/persons", (request, response, next) => {
  const name = request.body.name;
  const number = request.body.number;
  if (!name || !number) {
    return response.status(400).json({ error: "Name/Number missing." });
  }
  Contact.find({ name }).then((contact) => {
    if (contact.length) {
      return response
        .status(400)
        .json({ error: "Name already exists in phonebook." });
    } else {
      const newPerson = new Contact({ name, number });
      newPerson
        .save()
        .then((result) => response.json(result))
        .catch((error) => next(error));
    }
  });
});

// update contact
app.put("/api/persons/:id", (request, response, next) => {
  const name = request.body.name;
  const number = request.body.number;
  const person = { name, number };

  Contact.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

// get info about phonebook
app.get("/info", (request, response) => {
  const date = new Date();
  Contact.find({}).then((contacts) => {
    const count = contacts.length;
    response.send(`<p>Phonebook has ${count} people.</p> ${date}`);
  });
});

// listen on port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 404
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
