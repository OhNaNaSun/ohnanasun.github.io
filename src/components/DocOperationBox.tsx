import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { useHistory } from 'react-router-dom'
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  textField: {
    width: '80%',
  },
}))
interface DocOperationBoxProps {
  fileId: string
  docTitle: string
  category: string
  setMessage: Dispatch<SetStateAction<{ status: 'error' | 'success'; text: string } | null>>
  mdContent: string
}
const DocOperationBox: React.FC<DocOperationBoxProps> = ({ docTitle, fileId, category, setMessage, mdContent }) => {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  useEffect(() => {
    setTitle(docTitle)
  }, [docTitle])
  const postNewFile = async (): Promise<void> => {
    if (!title) {
      setMessage({ status: 'error', text: 'title is required' })
      return
    }
    const uploadFileResponse = await fetch(
      `${process.env.PUBLIC_URL}/api/documents/${category}${fileId === 'add' ? '' : `/${fileId}`}`,
      {
        method: fileId === 'add' ? 'POST' : 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          title,
          content: mdContent,
        }),
      }
    )
    const { statusText } = uploadFileResponse
    const resData = await uploadFileResponse.json()
    setMessage({ status: 'success', text: statusText })
    history.push(`./${resData.id}`)
  }
  return (
    <Box color="text.primary" className={classes.titleBox}>
      <TextField
        id="titleField"
        className={classes.textField}
        color="secondary"
        fullWidth
        required
        onChange={(e): void => {
          setTitle(e.target.value)
        }}
        placeholder="Title"
        InputLabelProps={{
          shrink: true,
        }}
        value={title}
      />
      <Button
        className={classes.button}
        variant="outlined"
        onClick={(): void => {
          postNewFile()
        }}
      >
        Save
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={(): void => {
          history.push(`/question`)
        }}
      >
        Back
      </Button>
    </Box>
  )
}
export default DocOperationBox
