import axios from "axios"
import React, { useEffect, useState } from "react"

const weather_api_key = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const params = {
      access_key: weather_api_key,
      query: country.capital,
    }

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setWeatherData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [country.capital])

  return (
    <div>
      {weatherData.length === 0 ? null : (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>
            <strong>temperature:</strong> {weatherData.current.temperature}{" "}
            Celcius
          </p>
          <img
            src={weatherData.current.weather_icons[0]}
            alt="weather status icon"
          />
          <p>
            <strong>wind:</strong> {weatherData.current.wind_speed} mph
            direction {weatherData.current.wind_dir}
          </p>
        </div>
      )}
    </div>
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <img src={country.flag} alt="country flag" style={{ width: "125px" }} />

      <Weather country={country} />
    </div>
  )
}

const Country = ({ country }) => {
  return <li>{country.name}</li>
}

const Countries = ({ countries, showSearch }) => {
  if (showSearch.length === 0) {
    return null
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <Country key={country.name} country={country} />
        ))}
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showSearch, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(showSearch.toLowerCase())
  )

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={showSearch} onChange={handleSearch} />
      <Countries countries={countriesToShow} showSearch={showSearch} />
    </div>
  )
}

export default App
