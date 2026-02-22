import Person from "./Person"

const Persons = ({ persons, filter }) => {
    return (
        persons.filter(
            p => p.name.toLowerCase().includes(filter)
        ).map(
            p => <Person key={p.name} name={p.name} number={p.number} />
        )
    )
}

export default Persons