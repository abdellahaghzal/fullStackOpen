import { useState } from 'react'

const CreateBlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  return (
    <form onSubmit={ () => { handleSubmit({title, author, url}) } }>
      <div>
        <label>
          title
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            type="text"
            />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
            type="text"
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            value={url}
            onChange={(e) => { setURL(e.target.value) }}
            type="text"
          />
        </label>
      </div>
      <button type="submit">
        create
      </button>
    </form>
  )
}

export default CreateBlogForm