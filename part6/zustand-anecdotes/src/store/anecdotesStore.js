import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteService from '../service/service'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: (id) => set(state => {
      const anecdotes = structuredClone(state.anecdotes)
      const toUpdate = anecdotes.find(anecdote => anecdote.id === id)
      toUpdate.votes += 1
      anecdoteService.update(toUpdate)
      return { anecdotes: anecdotes }
    }),
    add: (anecdote) => set(state => {
      anecdote = asObject(anecdote)
      anecdoteService.add(anecdote)
      return {
        anecdotes: state.anecdotes.concat(anecdote)
      }
    }),
    del: (id) => set(state => {
      anecdoteService.del(id)
      return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }
    }),
    setFilter: (filter) => set(() => ({ filter: filter })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore(useShallow(
  (state) => state.anecdotes
              .filter(anecdote => anecdote.content
              .toLowerCase()
              .includes(state.filter.toLowerCase()))
              .toSorted((a, b) => (b.votes - a.votes))
))
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
