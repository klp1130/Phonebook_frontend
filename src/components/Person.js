import personsService from './services/persons'

const Person = (props) => {
    const { person, setPersons } = props
  
    const handle = () => {
      const message = `Delete ${person.name}`
  
      if (window.confirm(message)) {
        personsService.delete(person.id)
        personsService.getAll().then(data => setPersons(data))
      }
    }
    return (
        <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={handle} >Delete</button></td>
      </tr>
    )
    }
  
  export { Person }