const successStyle = {
    padding: "3px",
    border: "4px solid green",
    color: "green"
}

const Success = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <p style={successStyle}>{message}</p>
    )
}

export default Success