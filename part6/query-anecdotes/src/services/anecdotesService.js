const BaseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const res = await fetch(BaseURL)

  if (!res.ok) {
    throw new Error("Couldn't fetch anecdotes")
  }

  return await res.json()
}

const addNew = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
 
  const response = await fetch(BaseURL, options)
 
  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.error)
  }
 
  return body
}

const vote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  }

  const URL = `${BaseURL}/${anecdote.id}`
  const response = await fetch(URL, options)
 
  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
 
  return await response.json()
} 

export default { getAll, addNew, vote }