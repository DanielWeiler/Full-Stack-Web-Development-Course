import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm component calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Big story' },
  })
  fireEvent.change(author, {
    target: { value: 'foogle guy' },
  })
  fireEvent.change(url, {
    target: { value: 'foog.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Big story')
  expect(createBlog.mock.calls[0][0].author).toBe('foogle guy')
  expect(createBlog.mock.calls[0][0].url).toBe('foog.com')
})
