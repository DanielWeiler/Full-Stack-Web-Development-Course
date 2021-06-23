import React from "react"

const Filter = ({ showAll, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={showAll} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
