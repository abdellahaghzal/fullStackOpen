import axios from 'axios'

const countriesApiURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_API_KEY}&units=metric&q=`

const getCountries = () => {
    return axios.get(countriesApiURL)
}

const getWeather = (country) => {
    return axios.get(weatherApiURL + country.capital + ',' + country.cca2)
}

export default {getCountries, getWeather}