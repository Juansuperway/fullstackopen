import {useState, useEffect} from 'react'

const Filter = (props) => {
  return (
    <div>
        Find countries <input value={props.value} onChange={props.onChange}/>
      </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error))
  }, [])
  
  const handlefilterCountry = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  console.log(filteredCountries.length)

  let content = ''

  if (filteredCountries.length > 10) {
    content = 'Too many matches, specify another filter'
  } else if (filteredCountries.length >= 2 && filteredCountries.length <= 10) {
    content = filteredCountries.map((country) => (
      <p key={country.cca3}>{country.name.common}</p>)
  )} else if (filteredCountries.length === 1) {
      let country = filteredCountries[0]
      content = <div>
        <h1>{country.name.common}</h1>
        <p >Capital: {country.capital[0]}</p>
        <h2>Languages</h2>
        <ul>
        {Object.values(country.languages).map((language) => 
          <li key={language}>{language}</li>)}
        </ul>
        <img alt={`${country.name.common} flag`} src={country.flags.png}/>
        </div>    
  }

  
  return (
      <div>
        <Filter value={search} onChange={handlefilterCountry}/>
        {content}
      </div>
    )
  
  
}

export default App
