import React from 'react'
import Typist from 'react-typist'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
const PageHeader: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/question" className={classes.title}>
            <Typography color="textPrimary">Questions</Typography>
          </Link>
          <Button>
            <Typist key={1} stdTypingDelay={10} avgTypingDelay={40} cursor={{ show: false }}>
              have fun{' '}
              <span role="img" aria-label="lala">
                ❤️
              </span>
              <Typist.Delay ms={500} />
            </Typist>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default PageHeader
