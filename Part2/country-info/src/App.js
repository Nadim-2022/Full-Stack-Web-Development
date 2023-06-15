import React, { useEffect, useState } from 'react';
import services from './countrysearch';
import CountryDetails from './countryshow';
import Filtercountry from './Filtercountry';


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    services.getAll()
      .then((response) => {
        setCountries(response)
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const filteredCountries = filter === ''
    ? countries
    : countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(filter.toLowerCase())
      )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  let countryToShow;
  if (filteredCountries.length > 10) {
    countryToShow = <p>Too many matches, please make your query more specific.</p>
  } else if (filteredCountries.length === 1) {
    countryToShow = <CountryDetails countries={filteredCountries} />
  } else {
    countryToShow = <CountryDetails countries={filteredCountries} />
  }

  return (
    <div>
      <Filtercountry filter={filter} handleFilterChange={handleFilterChange} />
      {countryToShow}
    </div>
  )
}

export default App;
