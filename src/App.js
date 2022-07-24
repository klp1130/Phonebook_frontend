import { useState, useEffect } from 'react'

import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import './index.css'
import Persons from './components/Persons';
import personService from './services/persons';
import { Title } from './components/Title';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  

  const timer = 300

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
      setPersons(data)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    personService
      .query(newName)
      .then(person => {
        const newObject = {
          'name': newName,
          'number': newNumber
        }
        if (person) {
          const message = `${newName} is already added to phonebook, replace the old number with a new one?`
          if (window.confirm(message)) {
            personService.update(person.id, newObject).then(() => {
              personService.getAll().then(data => setPersons(data))
              setMessage(`Added ${newName}`)
              setTimeout(() => setMessage(null), timer)
            }).catch(error => {
              setErrorMessage(error.response.data.error)
              setTimeout(() => setErrorMessage(null), timer)
            })
          }
        } else {
          personService.create(newObject).then(() => {
            personService.getAll().then(data => setPersons(data))
            setNewName('')
            setMessage(`Added ${newName}`)
            setTimeout(() => setMessage(null), timer)
          }).catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => setErrorMessage(null), timer)
          })
        }
      })
    }

    
/*
  const deletePerson = (id) => {
    const filteredPerson = allPersons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      personService
        .remove(personId)
      console.log(`${personName} successfully deleted`)
      setMessage(
        `${personName} was successfully deleted`
      )
      setAllPersons(allPersons.filter(person => person.id !== personId))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
*/

  return (
    <div>
      <Title name={'Phonebook'} />
      {
        message && 
        <Notification message={message} />
      }
      {
        errorMessage &&
        <Notification message={message} error={true} />  
      }  

      <Filter searchName={searchName} setSearchName={setSearchName} />
      <Title name={'Add a new'} />
      <PersonForm
         submit={handleSubmit} 
         newName= {newName} 
         setNewName={setNewName} 
         newNumber={newNumber} 
         setNewNumber={setNewNumber} 
         />
      <Title name={'Numbers'} />
      <Persons persons={persons} searchName={searchName} setPersons={setPersons} />
    </div>
  )
}

export default App