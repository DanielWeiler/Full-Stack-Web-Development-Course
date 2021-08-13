import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  let submitDisabled = true
  if (
    title.input.value !== '' &&
    author.input.value !== '' &&
    url.input.value !== ''
  ) {
    submitDisabled = false
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
    }
    toggleForm.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(clearNotification())
    dispatch(
      setNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        'success',
        5
      )
    )
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title.input} />
        </div>
        <div>
          author:
          <input {...author.input} />
        </div>
        <div>
          url:
          <input {...url.input} />
        </div>
        <button id="create" type="submit" disabled={submitDisabled}>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
