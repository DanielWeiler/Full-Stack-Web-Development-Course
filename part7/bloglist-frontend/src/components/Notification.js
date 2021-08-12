import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const content = useSelector((state) => state.notification.content)
  const style = useSelector((state) => state.notification.style)
  return <div style={style}>{content}</div>
}

export default Notification
