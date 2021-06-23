import axios from "axios"
import React, { useEffect, useState } from "react"

const Country = ({ country }) => {
  return <li>{country.name}</li>
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      
      <img src={country.flag} alt="country flag" style={{ width: "125px" }} />
    </div>
  )
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

  console.log(countriesToShow)

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
