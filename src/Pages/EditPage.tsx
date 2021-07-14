import React, { useState } from 'react'
import MarkdownEditor from 'components/MarkdownEditor'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useParams } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import DocOperationBox from '../components/DocOperationBox'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  editor: {
    width: '90%',
    margin: '0 auto',
    marginTop: theme.spacing(12),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '80%',
  },
}))
const EditPage: React.FC = () => {
  const classes = useStyles()
  const { category, fileId } = useParams()
  const [mdContent, setMdContent] = useState('')
  const [message, setMessage] = useState<{ text: string; status: 'success' | 'error' } | null>(null)
  const handleClose = (): void => {
    setMessage(null)
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" aria-label="menu" className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.editor}>
        <DocOperationBox category={category} setMessage={setMessage} mdContent={mdContent} />
        <MarkdownEditor mdContent={mdContent} returnMdContent={setMdContent} />
        <Snackbar
          open={!!message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity={message?.status}>{message?.text}</Alert>
        </Snackbar>
      </div>
    </>
  )
}
export default EditPage
