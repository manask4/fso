import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import phonebookService from "./services/phonebook";

import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService.getAll().then((response) => setPersons(response.data));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState({ text: null, type: null });

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personExists = persons.map((person) => person.name).includes(newName);
    if (personExists) {
      const confirmAdd = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with the new one?`
      );
      if (confirmAdd) {
        const person = persons.filter((person) => person.name === newName)[0];
        updatePerson(person);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phonebookService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        flashNotification({
          text: `You have added ${newName} to your phonebook.`,
          type: "success",
        });
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const updatePerson = (person) => {
    const personObject = { ...person, number: newNumber };
    phonebookService
      .update(person.id, personObject)
      .then((response) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : response.data))
        );
        flashNotification({
          text: `You have updated ${newName}'s details in your phonebook.`,
          type: "success",
        });
      })
      .catch((err) => {
        flashNotification({
          text: `Information of ${newName} has already been removed from the server.`,
          type: "error",
        });
      });
  };

  const deletePerson = (id) => {
    const personName = persons.filter((person) => person.id === id)[0].name;
    const confirmDelete = window.confirm(
      `Delete ${personName} from phonebook?`
    );
    if (confirmDelete) {
      phonebookService.remove(id).then((response) => {
        if (response.status === 200) {
          setPersons(persons.filter((person) => person.id !== id));
        }
      });
    }
  };

  const flashNotification = ({ text, type }) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification({ text: null, type: null });
    }, 3000);
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />
      <div>
        <Notification message={notification} />
        <h3>Add new</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <div>
        <h3>Numbers</h3>
        <Persons
          deletePerson={deletePerson}
          persons={persons}
          searchName={searchName}
        />
      </div>
    </div>
  );
}

export default App;
