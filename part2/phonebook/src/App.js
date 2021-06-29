import React, { useEffect, useState } from "react"
import Filter from "./components/Filter"
import NewPersonForm from "./components/NewPersonForm"
import Person from "./components/Person"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.log("fetchdata", error)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
          /* setMessageStyle("success")
          setMessage(`Added ${newName} to the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 3000) */
        })
        .catch((error) => {
          console.log("addName", error)
        })
    }
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(showAll.toLowerCase())
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }

  const handleRemovePerson = (id) => {
    const person = persons.find((p) => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          console.log("remove person", error)
          /* setMessageStyle("error")
          setMessage(
            `Information of ${person[0].name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000) */
          //setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <NewPersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person
            key={person.name}
            person={person}
            handleRemovePerson={handleRemovePerson}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
