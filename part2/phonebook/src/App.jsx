import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleChangeName = (e) => {
    setNewName(e.target.value.trim())
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value.trim())
  }
  
  const handleChangeFilter = (e) => {
    setFilter(e.target.value.trim().toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleChangeFilter} />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={handleSubmit}
        onChangeName={handleChangeName}
        onChangeNumber={handleChangeNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App