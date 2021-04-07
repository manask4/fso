function PersonForm({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) {
  return (
    <form onSubmit={addPerson}>
      <div className="form-inputs">
        <div className="form-field-group">
          <label>Name</label>
          <input required value={newName} onChange={handleNameChange} />
        </div>
        <div className="form-field-group">
          <label>Number</label>
          <input required value={newNumber} onChange={handleNumberChange} />
        </div>
        <button className="add-btn" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
