import React, { useEffect, useState } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

interface MessageType {
  text: string
  status: 'error' | 'success'
}
interface MessageBarProps {
  messageIn: MessageType
}
const MessageBar: React.FC<MessageBarProps> = ({ messageIn }) => {
  const [message, setMessage] = useState<MessageType | null>(null)
  const handleClose = (): void => {
    setMessage(null)
  }
  useEffect(() => {
    setMessage(messageIn)
  }, [messageIn])
  return (
    <Snackbar
      open={!!message}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={message?.status}>{message?.text}</Alert>
    </Snackbar>
  )
}
export default MessageBar
