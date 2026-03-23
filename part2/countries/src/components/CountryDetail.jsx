
import Weather from './weather.jsx'

const CountryDetail = ({ country }) => {    
    const [lat, lng] = country.latlng
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital?.[0] || 'N/A'}</p>
            <p>Area: {country.area.toLocaleString()} km²</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => (
                <li key={lang}>{lang}</li>
            ))}
            </ul>
            <img alt={`${country.name.common} flag`} src={country.flags.png} />
            <Weather lat={lat} lon={lng} />
        </div>
)}

export default CountryDetail