import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handlefilterPersons = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with <input value={search} onChange={handlefilterPersons}/>
      </div>
      <section>
        <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePersonNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </section>
      <h2>Numbers</h2>
      
        {persons
          .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
          .map((person) => (
            <p key={person.id}>
              {person.name} - {person.number}
            </p>
          ))
        }
      
    </div>
  )
}

export default App