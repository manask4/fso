import Weather from "./Weather";

function CountryProfile({ profile }) {
  return (
    <div>
      <h2>{profile.name}</h2>
      <div className="card">
        <div className="card-row">
          <p>
            Capital: <b>{profile.capital}</b>
          </p>
          <p>
            Population: <b>{profile.population}</b>
          </p>
        </div>
        <div className="card-row">
          <div style={{ textAlign: "left" }}>
            <p>
              <strong>Languages</strong>
            </p>
            {profile.languages.map((language, i) => (
              <li key={i}>{language.name}</li>
            ))}
          </div>
          <div>
            <img
              height="100"
              width="100"
              alt="country flag"
              src={profile.flag}
            />
          </div>
        </div>
        <hr />
        <div>
          <p>Weather in {profile.capital}</p>
          <Weather city={profile.capital} />
        </div>
      </div>
    </div>
  );
}

export default CountryProfile;
