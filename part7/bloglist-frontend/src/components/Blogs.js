import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

  /* const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  } */
  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm toggleForm={blogFormRef} />
      </Togglable>

      <Table striped>
        <tbody>
          {blogs.sort(byLikes).map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
