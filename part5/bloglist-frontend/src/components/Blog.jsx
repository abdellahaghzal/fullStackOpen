import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, setNotification }) => {
  const [expand, setExpand] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [deleted, setDeleted] = useState(false)

  const toggleExpand = () => { setExpand(!expand) }

  const blogStyle = {
    display: deleted ? 'none' : '',
    border: '2px solid black',
    marginTop: '7px',
    marginBottom: '7px',
    padding: '5px'
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
    }
  }

  const handleDelete = async () => {
    try {
      if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog)
        setDeleted(true)
      }
    } catch (e) {
      console.error(e.message)
      setNotification({
        message: 'error while deleting the blog',
        type: 'error'
      })
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={ toggleExpand }>
        {expand ? 'hide' : 'view'}
      </button>

      {expand ?
        <div style={{ display: expand ? '' : 'none'}}>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button onClick={ handleLike }>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          <button onClick={ handleDelete }>
            remove
          </button>
        </div>
        : null
      }
    </div>
  )
}

export default Blog