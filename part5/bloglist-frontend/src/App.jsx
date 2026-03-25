import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const userStr = window.localStorage.getItem('loggedBlogAppUser')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(userStr))
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    if (!user) { return }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  if (!user) {
    return (
      <>
        <h2>Login</h2>
        <Notification notification={ notification } />
        <LoginForm
          setUser={ setUser }
          setNotification={ setNotification }
        />
      </>
    )
  }
  return (
    <>
      <h2>blogs</h2>
      <Notification notification={ notification } />
      <UserInfo
        user={ user }
        setUser={ setUser }
      />
      <Togglable buttonLabel='create new blog'>
        <h2>create new</h2>
        <CreateBlogForm
          setBlogs={ setBlogs }
          setNotification={ setNotification }
          blogs={ blogs }
          user={ user }
        />
      </Togglable>
      <Blogs
        blogs={ blogs }
        user={ user }
        setNotification={ setNotification }
      />
    </>
  )
}

export default App