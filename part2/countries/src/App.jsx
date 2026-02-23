import { useState } from 'react'
import Countries from './components/Countries'

function App() {
  const [name, setName] = useState('')

  const handleChange = (e) => {
    setName(e.target.value.trim().toLowerCase())
  }

  return (
    <>
      <p>
        find countries <input value={name} onChange={handleChange}></input>
      </p>
      <Countries name={name}/>
    </>
  )
}

export default App
