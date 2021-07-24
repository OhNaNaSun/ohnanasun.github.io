import React from 'react'
import Typist from 'react-typist'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
