import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useNavigate } from "react-router-dom"
import { TextField, Button } from '@mui/material'

const LoginForm = ({ setUser, setNotification }) => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginService.login({ username, password })
      const user = res.data
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
      navigate("/")
    } catch (e) {
      console.error(e.message)
      setNotification({
        message: e.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in to application</h1>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
      </div>
      <div>
        <TextField
          style={{ marginTop: 10 }}
          label="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
      </div>
      <Button type="submit"  variant="contained" style={{ marginTop: 10 }}>login</Button>
    </form>
  )
}

export default LoginForm