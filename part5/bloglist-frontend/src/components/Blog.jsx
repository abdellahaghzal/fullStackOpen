import { useState } from "react"
import blogService from '../services/blogs'
import { useNavigate } from "react-router-dom"
import { Button } from '@mui/material'

const Blog = ({ blog, setNotification, user }) => {
  const navigate = useNavigate()
  const [likes, setLikes] = useState(blog?.likes || 0)

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    try {
      await blogService.like(blog)
      setLikes(likes + 1)
    } catch (e) {
      console.error(e.message)
      setNotification({
        message: 'error while liking the blog',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async () => {
    try {
      if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog)
        navigate('/')
      }
      setNotification({
        message: `${blog.title} by ${blog.author} was deleted successfully`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (e) {
      console.error(e.message)
      setNotification({
        message: 'error while deleting the blog',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div style={{padding: "10px", paddingTop: "0px", border: "solid grey 3px", marginTop: "8px", borderRadius: "10px"}}>
      <h1>{blog.title}</h1>
      <h3 style={{color: "grey"}}>by {blog.author}</h3>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p style={{color: "grey"}}>Added by {blog.user.username}</p>
      <div>
        <span>likes {likes}</span>
        <Button variant="contained" style={{marginLeft: 5}} onClick={ handleLike }>
          like
        </Button>
        {user.username === blog.user.username ?
          <Button variant="contained" style={{marginLeft: 5}} onClick={ handleDelete }>
            remove
          </Button>
          : null
        }
      </div>
    </div>
  )
}

export default Blog