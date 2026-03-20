const UserInfo = ({ user, setUser }) => {
  return (
    <p>
      {user.username} logged in
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
      }}>
        logout
      </button>
    </p>
  )
}

export default UserInfo