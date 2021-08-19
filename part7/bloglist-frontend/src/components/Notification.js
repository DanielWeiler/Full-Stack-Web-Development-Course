import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const content = useSelector((state) => state.notification.content)
  const style = useSelector((state) => state.notification.style)
  return <Alert variant={style}>{content}</Alert>
}

export default Notification
