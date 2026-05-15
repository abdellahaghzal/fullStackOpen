import { createContext, useState } from "react"

const NotifContext = createContext()

export default NotifContext

export const NotifProvider = (props) => {
  const [notif, setNotif] = useState(null)

  const notify = (message) => {
    setNotif(message)
    setTimeout(() => {
      setNotif(null)
    }, 5000)
  }

  return (
    <NotifContext.Provider value={{ notif, notify }}>
      {props.children}
    </NotifContext.Provider>
  )
}