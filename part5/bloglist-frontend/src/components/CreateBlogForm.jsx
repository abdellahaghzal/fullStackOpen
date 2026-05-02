import { useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from "react-router-dom"
import { TextField, Button } from '@mui/material'

const CreateBlogForm = ({ setBlogs, blogs, setNotification, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const navigate = useNavigate();

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
      navigate("/")
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
      <h1>create new</h1>
      <div>
        <TextField
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
          label="title"
        />
      </div>
      <div>
          <TextField
            style={{ marginTop: 10 }}
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
            label="author"
          />
      </div>
      <div>
        <TextField
          style={{ marginTop: 10 }}
          value={url}
          onChange={(e) => { setURL(e.target.value) }}
          label="url"
        />
      </div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        create
      </Button>
    </form>
  )
}

export default CreateBlogForm