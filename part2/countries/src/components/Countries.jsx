import { useEffect } from "react"
import services from "../services/countries"
import { useState } from "react"
import Info from "./Info"

const Countries = ({ name }) => {
    const [countriesLst, setCountriesLst] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (name === '') {
            return
        }
        setLoading(true)
        setError(null)
        setCountriesLst(null)
        services
        .getCountries()
        .then(res => {
            setCountriesLst(
                res.data.filter(c => {
                    const common = c.name.common.toLowerCase()
                    const official = c.name.official.toLowerCase()
                    return (
                        common.includes(name) || official.includes(name)
                    )
                })
            )
        })
        .catch(() => {
            setError("failed to fetch data")
        })
        setLoading(false)
    }, [name])

    const handleShow = (country) => {
        setCountriesLst([country])
    }

    if (name === '') {
        return <p>Enter a country name!</p>
    }
    if (loading) {
        return <p>loading...</p>
    } else if (error) {
        return <p style={{color: "red"}}>{error}</p>
    } else if (countriesLst) {
        if (countriesLst.length === 0) {
            return <p>No matching countries</p>
        } else if (countriesLst.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (countriesLst.length === 1) {
            return <Info country={countriesLst[0]} />
        } else {
            return (
                countriesLst.map(
                    c => <div key={c.name.official}>{c.name.common} <button onClick={() => handleShow(c)}>Show</button></div>
                )
            )
        }
    }
}

export default Countries