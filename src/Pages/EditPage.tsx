import React from 'react'
import MarkdownEditor from 'components/MarkdownEditor'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  editor: {
    width: '90%',
    margin: '0 auto',
    marginTop: theme.spacing(12),
  },
}))
const EditPage: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button>hiii</Button>
          <Button>Save</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.editor}>
        <MarkdownEditor />
      </div>
    </>
  )
}
export default EditPage
