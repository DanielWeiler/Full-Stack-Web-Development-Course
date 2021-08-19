import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useField } from '../hooks/index'
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
    <div /* style={{ width: '50%', display: 'flex', flexDirection: 'row' }} */>
      <Form onSubmit={handleComment}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Add a comment here"
              style={{ marginBottom: 15 }}
              {...comment.input}
            />
          </Col>
          <Col>
            <Button type="submit">Add</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CommentForm
