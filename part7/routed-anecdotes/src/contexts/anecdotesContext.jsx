import { useState, useEffect, createContext } from "react"
import anecdoteService from "../services/anecdotes"

const AnecdotesContext = createContext(null)

export default AnecdotesContext

export const AnecdoteProvider = (props) => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  return (
    <AnecdotesContext.Provider value={{ anecdotes, setAnecdotes }} >
      {props.children}
    </AnecdotesContext.Provider>
  )
}
