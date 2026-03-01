import axios from 'axios'

const baseURL = "/api/persons"

const getPersons = () => {
    return axios.get(baseURL)
}

const postPerson = (newPerson) => {
    return axios.post(baseURL, newPerson)
}

const delPerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const updatePerson = (updatedPerson) => {
    return axios.put(`${baseURL}/${updatedPerson.id}`, updatedPerson)
}

export default { getPersons, postPerson, delPerson, updatePerson }