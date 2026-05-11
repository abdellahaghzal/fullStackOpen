import { useEffect } from 'react'
import { useAnecdotes, useAnecdoteActions } from '../store/anecdotesStore'
import { useNotificationActions } from '../store/notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, initialize, del } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()
  
  useEffect(() => {
    initialize()
  })

  const handleClick = (id, content) => {
    vote(id)
    setMessage(`You voted '${content}'`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => handleClick(anecdote.id, anecdote.content)}
            >
              vote
            </button>
            {anecdote.votes === 0 &&
              <button
                onClick={() => { del(anecdote.id) }}
              >
                delete
              </button>
            }
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList