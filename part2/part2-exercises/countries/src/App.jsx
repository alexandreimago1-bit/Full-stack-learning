import { useState,useEffect } from "react";
import  countriesService from './service/countriesService'

const Search = ({filterSearch, handleSetSearch}) => {
  return(
    <div>
        <label htmlFor="countryInput">find countries</label>
        <input type="text" id="countryInput" value={filterSearch} onChange={handleSetSearch}/>
    </div>
  )
} 

  const WeatherDetails = ({weather,capital}) => {
    return(
      <div>
        <h1>Weather in {capital}</h1>
        <p>Temperature - {weather.main.temp}</p>
        <p>Wind - {weather.wind.speed}</p>
        <img src = {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      </div>
    )
  }

const CountryDetails = ({country}) => {
  const [weather, setWeather] = useState(null)
  useEffect(()=>{
    countriesService
    .getWeather(country.capitalInfo.latlng[0],country.capitalInfo.latlng[1])
    .then(initialResponse => {
      console.log('promise fulfilled')
      setWeather(initialResponse)
    })
  },[country])

    console.log(weather)
  return(    
  <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          (<li key={language}>{language}</li>)
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
      <div>
        { weather ?  <WeatherDetails weather={weather} capital={country.capital[0]}/> : null }
      </div>
  </div> 
  )}



  const CountryList = ({countriesToShow, handleSelectCountry, selectCountry}) => {
    return(
      countriesToShow.map(country => (
      <div key={country.cca3}>{country.name.common}
      <button  onClick={()=>{handleSelectCountry(country.cca3)}}>Show</button>
      {selectCountry === country.cca3 && ( <CountryDetails country={country}/> )}
      </div>
      ))
    )
  }

  const Content = ({countriesToShow, handleSelectCountry, selectCountry}) => {
    let content
      if (countriesToShow.length > 10) {
      content = <p>Too many matches, specify another filter.</p>
    } else if (countriesToShow.length > 1) {
      content = <CountryList countriesToShow={countriesToShow} handleSelectCountry={handleSelectCountry} selectCountry={selectCountry}/>
    } else if (countriesToShow.length === 0) {
      content = ''
    }else if (countriesToShow.length === 1){
      let country = countriesToShow[0]
      content = <CountryDetails country = {country}/>
    }
    return content
      }

const App = () => {
  const [filterSearch, setFilterSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectCountry, setSelectCountry] = useState('')

  useEffect(() =>{
    console.log('effect')
    countriesService
    .getAll()
    .then(initialCountries => {
      console.log('promise fulfilled')
      setCountries(initialCountries)
    })
  } ,[])
  const handleSetSearch = (event) => {
    console.log(event.target.value)
    setFilterSearch(event.target.value)
    setSelectCountry('')
  }
  const handleSelectCountry = (cca3) =>{
    console.log(cca3)
    setSelectCountry(cca3)
  }
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterSearch.toLowerCase())
  )


  return (
    <div>
      <h1>
        Countries
      </h1>
        <Search filterSearch={filterSearch} handleSetSearch={handleSetSearch}/>
        <div>
          <Content handleSelectCountry={handleSelectCountry} countriesToShow={countriesToShow} selectCountry={selectCountry}/>
        </div>
    </div>
  )
}
export default App