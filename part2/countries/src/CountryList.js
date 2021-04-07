function CountryList({ countries, handleShow }) {
  return countries.map((country) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} key={country.numericCode}>
      <p>{country.name}</p>
      <button onClick={() => handleShow(country.numericCode)} style={{ marginLeft: "10px" }}>Show</button>
    </div>
  ));
}

export default CountryList;
