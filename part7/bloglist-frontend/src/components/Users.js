import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.allUsers)
  const blogs = useSelector((state) => state.blogs)

  // Users must be reinitialized here because, after a blog is created, the number of blogs associated with each user is not updated (so the number of blogs created by the user is not updated on the Users page) because the blogs array property on the user object needs to be populated but this does not happen because the user object is not given a "get" request at the time of the blog "post" request
  useEffect(() => {
    dispatch(initializeUsers())
  }, [blogs])

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
