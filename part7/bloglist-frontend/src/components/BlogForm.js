import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
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
        `A new blog "${blog.title}" by "${blog.author}" added`,
        'success',
        5
      )
    )
    title.reset()
    author.reset()
    url.reset()
  }

  const margin = {
    marginTop: 10,
    marginBottom: 10,
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Label>Title:</Form.Label>
        <Form.Control id='title' {...title.input} />
        <Form.Label>Author:</Form.Label>
        <Form.Control id='author' {...author.input} />
        <Form.Label>URL:</Form.Label>
        <Form.Control id='url' {...url.input} />
        <Button
          id="create"
          type="submit"
          disabled={submitDisabled}
          style={margin}
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
