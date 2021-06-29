import React from "react"

const Person = ({ person, handleRemovePerson }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          handleRemovePerson(person.id)
        }}
      >
        delete
      </button>
    </li>
  )
}

export default Person
