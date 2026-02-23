import Languages from "./Languages"
import Flag from "./Flag"
import Weather from "./Weather"

const Info = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h2>Languages</h2>
            <Languages languages={country.languages} />
            <Flag country={country} />
            <h2>Weather in {country.capital}</h2>
            <Weather country={country} />
        </>
    )
}

export default Info