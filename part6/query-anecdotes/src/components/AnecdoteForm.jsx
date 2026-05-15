import { useAnecdote } from "../hooks/useAnecdote"
import { useNotif } from "../hooks/useNotif"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdote()
  const { notify } = useNotif()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await addAnecdote(content)
    event.target.reset()
    notify(`created '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm