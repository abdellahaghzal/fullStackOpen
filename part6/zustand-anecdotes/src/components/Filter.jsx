import { useAnecdoteActions } from "../store/anecdotesStore"

const Filter = () => {
  const { setFilter } = useAnecdoteActions()

  const handleChange = (event) => {
    const content = event.target.value
    setFilter(content)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter