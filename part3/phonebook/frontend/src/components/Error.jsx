const errorStyle = {
    padding: "3px",
    border: "4px solid red",
    color: "red"
}

const Error = ({ error }) => {
    if (error === null) {
        return null
    }
    return (
        <p style={errorStyle}>{error}</p>
    )
}

export default Error