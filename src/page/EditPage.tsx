/* eslint-disable */
import React, { useState, useEffect } from 'react'
import MarkdownEditor from 'components/MarkdownEditor'
import { makeStyles } from '@material-ui/core/styles'
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
    marginTop: theme.spacing(5),
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
  const [docTitle, setDocTitle] = useState('')
  const [message, setMessage] = useState<{ text: string; status: 'success' | 'error' } | null>(null)

  const handleClose = (): void => {
    setMessage(null)
  }
  useEffect(() => {
    if (fileId === 'add') {
      setDocTitle('')
      setMdContent('')
    }
  }, [fileId])
  useEffect(() => {
    const getDocContent = async (): Promise<void> => {
      const fetchContentRes = await fetch(`${process.env.REACT_APP_API_URL}/documents/${category}/${fileId}`)
      const resData = await fetchContentRes.json()
      setDocTitle(resData.title)
      setMdContent(resData.content)
    }
    fileId !== 'add' && getDocContent()
  }, [category, fileId])
  return (
    <div className={classes.editor}>
      <DocOperationBox
        fileId={fileId}
        docTitle={docTitle}
        category={category}
        setMessage={setMessage}
        mdContent={mdContent}
      />
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
  )
}
export default EditPage
