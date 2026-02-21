import Part from "./Part"

const Content = (props) => {
    return (
        props.parts.map(p => {
            return (
                <Part key={p.name} part={p.name} exercises={p.exercises}/>
            )
        })
    )
}

export default Content