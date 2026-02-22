import Part from "./Part"

const Content = ({ parts }) => {
    return (
        parts.map(p => {
            return (
                <Part key={p.id} part={p.name} exercises={p.exercises}/>
            )
        })
    )
}

export default Content