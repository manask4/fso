function Persons({ persons, searchName, deletePerson }) {
  return (
    <>
      {persons.length > 0 && (
        <table className="persons-table">
          <tbody>
            {persons
              .filter((person) =>
                person.name.toLowerCase().includes(searchName.toLowerCase())
              )
              .map((person, i) => (
                <tr key={i}>
                  <td className="name">{person.name}</td>
                  <td className="number">{person.number}</td>
                  <td><button onClick={() => deletePerson(person.id)} className="delete-btn">Delete</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Persons;
