const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital?.[0] || 'N/A'}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img alt={`${country.name.common} flag`} src={country.flags.png} />
  </div>
)

export default CountryDetail