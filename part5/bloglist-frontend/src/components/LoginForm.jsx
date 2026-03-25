import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({ setUser, setNotification }) => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginService.login({ username, password })
      const user = res.data
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
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
      <div>
        <label>
          username: 
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}>
          </input>
        </label>
      </div>
      <div>
        <label>
          password: 
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}>
          </input>
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm