import { useNotif } from "../hooks/useNotif"

const Notification = () => {
  const { notif } = useNotif()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notif) return null

  return (
    <div style={style}>
      { notif }
    </div>
  )
}

export default Notification