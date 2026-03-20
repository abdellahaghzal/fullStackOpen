import Blog from "./Blog"

const Blogs = ({ blogs, setNotification }) => {
  return (
    <>  
      {blogs
        .sort((a, b) => (b.likes - a.likes))
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            setNotification={setNotification}
          />
        )}
    </>
  )
}

export default Blogs