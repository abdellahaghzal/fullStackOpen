import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [expand, setExpand] = useState(false)

  const toggleExpand = () => { setExpand(!expand) }

  return (
    <div>
      {blog.title} {blog.author}
      <button onClick={ toggleExpand }>
        {expand ? 'hide' : 'view'}
      </button>

      {expand ?
        <div style={{ display: expand ? '' : 'none'}}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={ handleLike }>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          <button>
            remove
          </button>
        </div>
        : null
      }
    </div>
  )
}

export default Blog