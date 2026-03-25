import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ setBlogs, blogs, setNotification, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const info = { title, author, url }
      const newBlog = await blogService.create(info)
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setURL('')
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (e) {
      console.error(e.message)
      setNotification({
        message: e.message,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label>
          title:
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            type="text"
            />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
            type="text"
          />
        </label>
      </div>
      <div>
        <label>
          url:
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