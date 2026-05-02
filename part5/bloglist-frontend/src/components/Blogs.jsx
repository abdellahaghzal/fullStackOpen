import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => {
  return (
    <>
      <h2>blogs</h2>
      <ul>
        {blogs
          .sort((a, b) => (b.likes - a.likes))
          .map(blog =>
            <li key={blog.id}>
              <Link style={{padding: 5}} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </li>
          )}
      </ul>
    </>
  )
}

export default Blogs