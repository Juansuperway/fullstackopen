import {useState, useEffect} from 'react'
import Filter from './components/Filter.jsx'
import CountryList from './components/CountryList.jsx'
import CountryDetail from './components/CountryDetail.jsx'

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

  const handleShow = (name) => setSearch(name)
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  console.log(filteredCountries.length)

  let content = null

  if (filteredCountries.length > 10) {
    content = 'Too many matches, specify another filter'
  } else if (filteredCountries.length >= 2 && filteredCountries.length <= 10) {
    content = <CountryList countries={filteredCountries} onShow={handleShow}/>
  } else if (filteredCountries.length === 1) {
      let country = filteredCountries[0]
      content = <CountryDetail country={country} weather={country}/>
  }

  
  return (
      <div>
        <Filter value={search} onChange={handlefilterCountry}/>
        {content}
      </div>
    )
  
  
}

export default App
