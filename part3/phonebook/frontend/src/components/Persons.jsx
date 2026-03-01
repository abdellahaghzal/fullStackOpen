import Person from "./Person"

const Persons = ({ persons, filter, handleDelete }) => {
    return (
        persons.filter(
            p => p.name.toLowerCase().includes(filter)
        ).map(
            p => <Person key={p.id} onDelete={() => handleDelete(p)} name={p.name} number={p.number} />
        )
    )
}

export default Persons