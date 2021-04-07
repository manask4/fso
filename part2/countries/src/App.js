import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryProfile from "./CountryProfile";
import CountryList from "./CountryList";
import TooManyMatches from "./TooManyMatches";

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);

    if (val.length) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const updateCountryView = (numericCode) => {
    const filtered = countries.filter(
      (country) => country.numericCode === numericCode
    );
    setFilteredCountries(filtered);
    setSearchVal('');
  };

  const limit = 10;
  const displayList = filteredCountries.length <= limit;

  return (
    <div className="App">
      <div>
        <div className="search">
          Find Countries:{" "}
          <input value={searchVal} onChange={handleInputChange} />
        </div>
        <br />
        <div>
          {filteredCountries.length === 1 ? (
            <CountryProfile profile={filteredCountries[0]} />
          ) : displayList ? (
            <CountryList
              countries={filteredCountries}
              handleShow={updateCountryView}
            />
          ) : (
            <TooManyMatches />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
