import Blog from "./Blog"

const Blogs = ({ blogs, setNotification, user }) => {
  return (
    <>  
      {blogs
        .sort((a, b) => (b.likes - a.likes))
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={ user }
            setNotification={setNotification}
          />
        )}
    </>
  )
}

export default Blogs