import axios from "axios";


const countryURL = 'https://studies.cs.helsinki.fi/restcountries/api/all' 
const weatherKey = import.meta.env.VITE_WEATHER_KEY

const getAll= () => {
    return(axios
    .get(countryURL)
    .then(response => {return(response.data)}))
}

const getWeather = (lat,lon) => {
    const URL = 'https://api.openweathermap.org/data/2.5/weather'

    return(
        axios
        .get(`${URL}?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`)
        .then(response => {return(response.data)})
    )
}


export default {
    getAll,
    getWeather
}