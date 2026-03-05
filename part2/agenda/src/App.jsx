import { useState, useEffect } from 'react'
import axios from "axios"
import persons from "./db.json"

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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log('this is response.data:',response.data)
          setPersons(persons.concat(response.data))
          setNewName('')
    })}
  }

  const handlefilterPersons = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} search={search}/>
      
    </div>
  )
}

export default App 