import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import { useMatch, Link, Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import { AppBar, Toolbar, Button } from '@mui/material'

const App = () => {
  const userStr = window.localStorage.getItem('loggedBlogAppUser')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(userStr))
  const [notification, setNotification] = useState(null)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
              <h1 style={{display: "inline"}}>Blog App</h1>
              <div>
                <Button color="inherit"><Link to="/" style={{color: "white", textDecoration: "none"}}>Blogs</Link></Button>
                {user
                  ? <>
                      <Button color="inherit"><Link to="/create" style={{color: "white", textDecoration: "none"}}>New Blog</Link></Button>
                      <Button style={{color: "white"}} onClick={() => {
                        window.localStorage.removeItem('loggedBlogAppUser')
                        setUser(null)
                      }}>
                        Logout
                      </Button>
                    </>
                  : <Button color="inherit"><Link style={{color: "white", textDecoration: "none"}} to="/login">Login</Link></Button>
                }
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Notification notification={ notification } />
        <Routes>
          <Route path="/" element={
            <Blogs
              blogs={ blogs }
            />
          } />
          <Route path="/login" element={
            <LoginForm
              setUser={ setUser }
              setNotification={ setNotification }
            />
          } />
          <Route path="/blogs/:id" element={
            <Blog 
              blog={ blog }
              user= { user }
              setNotification={ setNotification }
            />
          } />
          <Route path="/create" element={
            <CreateBlogForm
              setBlogs={setBlogs}
              blogs={blogs}
              setNotification={setNotification}
              user={user}
            />
          } />
        </Routes>
      </div>
    </>
  )
}

export default App