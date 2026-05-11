import { useNotificationActions } from '../store/notificationStore'
import { useAnecdoteActions } from '../store/anecdotesStore'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add(content)
    e.target.reset()
    setMessage(`You created '${content}'`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm