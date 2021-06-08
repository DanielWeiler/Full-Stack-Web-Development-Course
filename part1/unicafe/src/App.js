import React, { useState } from "react"

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.all_ratings.length > 0) {
    let average =
      props.all_ratings.reduce((a, b) => a + b, 0) / props.all_ratings.length

    let positive_ratings = (props.good / props.all_ratings.length) * 100 + "%"

    return (
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={props.all_ratings.length} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive_ratings} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allRatings, setAll] = useState([])

  const handleClick = (rating, setter, value) => {
    const handler = () => {
      setter(rating + 1)
      setAll(allRatings.concat(value))
    }
    return handler
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClick(good, setGood, 1)} text="good" />
      <Button
        handleClick={handleClick(neutral, setNeutral, 0)}
        text="neutral"
      />
      <Button handleClick={handleClick(bad, setBad, -1)} text="bad" />

      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all_ratings={allRatings}
      />
    </div>
  )
}

export default App
