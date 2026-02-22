import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'

const App = () => {

  useEffect(() => {
    phonebookService
    .getPersons()
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

  const handleDelete = (p) => {
    if (window.confirm(`Delete ${p.name}?`))
    phonebookService
    .delPerson(p.id)
    .then(
      setPersons(persons.filter((person) => person.id !== p.id))
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = persons.find(p => p.name === newName)
    if (!found) {
      const newPerson = {name: newName, number: newNumber}
      phonebookService
      .postPerson(newPerson)
      .then(() => {
        setPersons(persons.concat(newPerson))
      })
    } else if (
      window.confirm(
        `${found.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const updatedPerson = {...found, number: newNumber}
      phonebookService
      .updatePerson(updatedPerson)
      .then((response) => {
        setPersons(persons.map((p) => 
          p.id === found.id ? response.data : p
        ))
      })
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

      <Persons handleDelete={handleDelete} persons={persons} filter={filter} />
    </div>
  )
}

export default App