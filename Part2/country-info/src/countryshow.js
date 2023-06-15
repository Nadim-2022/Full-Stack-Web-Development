import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetails = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country)
  }
  if (countries.length === 1) {
    const country = countries[0]

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
    )
  }

  if (selectedCountry) {
    return <CountryView country={selectedCountry} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => handleCountryClick(country)}>Show</button>
        </p>
      ))}
    </div>
  )
}

const CountryView = ({ country }) => {
    const [weather, setWeather] = useState(null)
  
    useEffect(() => {
      const apiKey = '';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`;
  
      axios
        .get(weatherUrl)
        .then((response) => {
          setWeather(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }, [country.capital])
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
  
        {weather && (
          <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        )}
      </div>
    )
  }
  
  export default CountryDetails;
