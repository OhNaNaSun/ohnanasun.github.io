import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '20px auto',
    },
    accordingTitle: {
      alignItems: 'center',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexGrow: 1,
      display: 'flex',
    },
    secondaryHeading: {
      marginRight: theme.spacing(2),
      fontSize: theme.typography.pxToRem(20),
    },
    questionBox: {
      backgroundColor: '#2D333B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    button: {
      fontSize: theme.typography.pxToRem(15),
      float: 'right',
      display: 'flex',
    },
  })
)
export default useStyles
