import React from 'react'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('text')

  const handleComment = (event) => {
    event.preventDefault()
    const content = comment.input.value
    dispatch(addComment(blog, content))
    comment.reset()
  }
  return (
    <form onSubmit={handleComment}>
      <input {...comment.input} />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
