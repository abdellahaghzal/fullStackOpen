const style = {
  success: {
    padding: "3px",
    border: "4px solid green",
    color: "green"
  },
  error: {
    padding: "3px",
    border: "4px solid red",
    color: "red"
  }
}

const Notification = ({ notification }) => {
  if (!notification) { return null }
  return (
    <p style={ style[notification.type] }>
      { notification.message }
    </p>
  )
}

export default Notification