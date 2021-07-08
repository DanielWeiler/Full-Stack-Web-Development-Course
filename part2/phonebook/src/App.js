import React, { useEffect, useState } from "react"
import Filter from "./components/Filter"
import NewPersonForm from "./components/NewPersonForm"
import Person from "./components/Person"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState("")
  const [message, setMessage] = useState("")
  const [messageStyle, setMessageStyle] = useState(null)

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

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = existingPerson.id
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)))
            setNewName("")
            setNewNumber("")
          })
          .catch((error) => {
            console.log(error.response.data)
            setMessageStyle("error")
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
          setMessageStyle("success")
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error.response.data)
          setMessageStyle("error")
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
          setMessageStyle("error")
          setMessage(
            `Information of ${person.name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter((p) => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageStyle={messageStyle} />
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
