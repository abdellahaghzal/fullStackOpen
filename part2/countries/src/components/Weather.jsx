import { useEffect, useState } from "react"
import services from "../services/countries"

const Weather = ({ country }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
        setData(null)
        setLoading(true)
        services
        .getWeather(country)
        .then(res => {
            setData(res.data)
        })
        .catch(() => {setError("failed to fetch weather data")})
        setLoading(false)
    }, [])

    if (loading) {
        return <p>loading...</p>
    } else if (error) {
        return <p style={{color: "red"}}>{error}</p>
    } else if (data) {
        return (
            <>
                <div>Temperature {data.main.temp} Celsius</div>
                <img src={`https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`}></img>
                <div>Wind {data.wind.speed} m/s</div>
            </>
        )
    }
}

export default Weather