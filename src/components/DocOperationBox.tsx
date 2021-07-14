import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import React, { useState, Dispatch, SetStateAction } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  titleBox: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '80%',
  },
}))
interface DocOperationBoxProps {
  category: string
  setMessage: Dispatch<SetStateAction<{ status: 'error' | 'success'; text: string } | null>>
  mdContent: string
}
const DocOperationBox: React.FC<DocOperationBoxProps> = ({ category, setMessage, mdContent }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const postNewFile = async (): Promise<void> => {
    if (!title) {
      setMessage({ status: 'error', text: 'title is required' })
      return
    }
    const uploadFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/documents/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        title,
        content: mdContent,
      }),
    })
    const { statusText } = uploadFileResponse
    setMessage({ status: 'success', text: statusText })
  }
  return (
    <Box color="text.primary" className={classes.titleBox}>
      <TextField
        id="titleField"
        className={classes.textField}
        multiline
        label="Title"
        color="secondary"
        fullWidth
        required
        onChange={(e): void => {
          setTitle(e.target.value)
        }}
        value={title}
      />
      <Button
        variant="outlined"
        onClick={(): void => {
          postNewFile()
        }}
      >
        Save
      </Button>
    </Box>
  )
}
export default DocOperationBox
