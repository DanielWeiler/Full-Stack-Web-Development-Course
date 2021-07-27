import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Testing the Blog component', () => {
  let component = null
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'Tester',
      url: 'test.net',
      likes: 7,
      user: 'Daniel',
    }

    component = render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
      />
    )
  })

  test('renders title and author but not url or likes by default', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('test title')
    expect(div).toHaveTextContent('Tester')
    expect(div).not.toHaveTextContent('test.net')
    expect(div).not.toHaveTextContent('7')
  })

  test('url and likes are shown when show button is clicked', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('test.net')
    expect(div).toHaveTextContent('7')
  })

  test('if like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
