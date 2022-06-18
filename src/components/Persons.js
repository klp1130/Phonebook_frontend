import { Person } from "./Person";

const Persons = (props) => {
    const { persons, personToShow, setPersons } = props

    return (
        <div>
            <table>
                <tbody>
                    {
                     persons.map((element) => {
                         if (personToShow.length === 0 || element.name.search(personToShow) !== -1) {
                             return (
                                 <Person key={element.id} person={element} setPersons={setPersons} />
                                    )
                            } else {
                              return null
                            }
                            }
                        )
                        }
                </tbody>
            </table>

        </div>
    )
}

export { Persons }
