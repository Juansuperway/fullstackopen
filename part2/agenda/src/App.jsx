import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Notification from './component/Notification'

const Filter = (props) => {
  return (
    <div>
        filter show with <input value={props.value} onChange={props.onChange}/>
      </div>
  )
}

const PersonForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handlePersonChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handlePersonNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <div>
    {props.persons
          .filter(person => person.name.toLowerCase().includes(props.search.toLowerCase()))
          .map((person) => (
            <p key={person.id}>
              {person.name} - {person.number}
              <button onClick={() => props.handleDelete(person.id, person.name)}>X</button>
            </p> 
          ))
        } 
        </div>
      )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  //console.log(persons)

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      
    }
    if (persons.some(person => person.name === newName)) {
    const personToUpdate = persons.find(p => p.name === newName)
      if (window.confirm(`${newName} is already added. Replace the old number with a new one?`)) {
        personsService
          .update(personToUpdate.id, {...personToUpdate, number: newNumber })
          .then(updatedPerson => {
            console.log("UPDATED PERSON:", updatedPerson)
            setPersons(
              persons.map(p => p.id !== personToUpdate.id ? p : updatedPerson)
            )
            setNewName('')
            setNewNumber('')
            setMessage(`${personToUpdate.name}'s number was updated.`)
              setTimeout(() => {
                setMessage(null)
        }, 5000)
   
          })
      }
    } else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          console.log('this is response.data:',returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          const nameToShow = newName
          setMessage(`Added ${nameToShow}`)
            setTimeout(() => {
              setMessage(null)
        }, 5000)
       
    })

  }
  }

  const handlefilterPersons = (event) => {
    setSearch(event.target.value)
  }

  const deleteFunction = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
    personsService
      .remove(id)
      .then(deletdPerson => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.error("Failed to delete:", error)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter value={search} onChange={handlefilterPersons}/>
      <section>
        <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handlePersonNumberChange={handlePersonNumberChange}
      />
      </section>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} handleDelete={deleteFunction}/>
      
      
    </div>
  )
}

export default App 