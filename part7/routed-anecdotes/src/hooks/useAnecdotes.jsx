import { useContext } from "react"
import anecdoteService from '../services/anecdotes'
import AnecdotesContext from "../contexts/anecdotesContext"

export const useAnecdotes = () => {
  const {anecdotes, setAnecdotes} = useContext(AnecdotesContext)

  const addAnecdote = async (anecdote) => {
    const newAnecdote = { ...anecdote, id: Math.round(Math.random() * 10000) }
    await anecdoteService.createNew(newAnecdote)
    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  const delAnecdote = async (id) => {
    await anecdoteService.del(id)
    setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
  } 

  return {
    anecdotes,
    addAnecdote,
    delAnecdote
  }
}