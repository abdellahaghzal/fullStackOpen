import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdote } from './hooks/useAnecdote'
import { useNotif } from './hooks/useNotif'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote } = useAnecdote()
  const { notify } = useNotif()

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
    notify(`voted '${anecdote.content}'`)
  }

  if (isError) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {isPending && <div>Loading...</div>}

      {!isPending && anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App