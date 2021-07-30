import React, { useEffect, useState, useCallback } from 'react'
import Tabs from '@material-ui/core/Tabs'
import { useLocation, useHistory } from 'react-router-dom'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import MessageBar from 'components/MessageBar'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'

import { Link as UiLink } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CircularProgress from '@material-ui/core/CircularProgress'
import ShowdownConverter from 'components/ShowdownConverter'

interface QuestionData {
  content: string
  title: string
  _id: string
}
type QuestionStateType = QuestionData & { isExpanded: boolean }
type QuestionMapType = QuestionStateType[]
const tabContentMap = [
  { key: 'javascript', name: 'JavaScript' },
  { key: 'react', name: 'React' },
  { key: 'html', name: 'HTML' },
  { key: 'css', name: 'CSS' },
]
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
const QuestionPage: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { hash } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; status: 'success' | 'error' } | null>(null)
  const hashTabIndex = tabContentMap.findIndex(({ key }) => key === hash.replace('#', ''))
  const [tabIndex, setTabIndex] = React.useState(hashTabIndex !== -1 ? hashTabIndex : 0)

  const [questionList, setQuestionList] = useState<QuestionMapType | null>(null)
  const fetchDoc = useCallback(() => {
    ;(async (): Promise<void> => {
      setIsLoading(true)
      const fileMapResponse = await fetch(`./api/documents/${tabContentMap[tabIndex].key}`)
      const fileMap = await fileMapResponse.json()
      setIsLoading(false)
      setQuestionList(
        fileMap.map((item: QuestionData) => {
          return { ...item, isExpanded: false }
        })
      )
    })()
  }, [tabIndex])
  useEffect(() => {
    fetchDoc()
  }, [fetchDoc])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
    setTabIndex(newValue)
  }
  const deleteDoc = async (id: string): Promise<void> => {
    const fileMapResponse = await fetch(`./api/documents/${tabContentMap[tabIndex].key}/${id}`, {
      method: 'DELETE',
    })
    const res = await fileMapResponse.json()
    if (res.status === 'success') {
      setMessage({ status: res.status, text: res.message })
      fetchDoc()
    }
  }
  const collpaseItem = (isExpanded: boolean, index: number): void => {
    setQuestionList((pre) => {
      if (!pre) return null
      const newState = [...pre]
      newState[index].isExpanded = !isExpanded
      return newState
    })
  }
  return (
    <div className={classes.root}>
      {message && <MessageBar messageIn={message} />}
      <Tabs value={tabIndex} onChange={handleChange}>
        {tabContentMap.map(({ key, name }) => (
          <Tab key={key} label={name} />
        ))}
      </Tabs>
      <div role="tabpanel">
        <Box p={3} className={classes.questionBox}>
          {isLoading ? (
            <CircularProgress size={30} color="secondary" />
          ) : (
            <Box width="100%">
              {questionList?.map(({ title, content, _id, isExpanded }, index) => (
                <Accordion
                  expanded={isExpanded}
                  key={index}
                  onChange={(): void => {
                    collpaseItem(isExpanded, index)
                  }}
                >
                  <AccordionSummary
                    classes={{ content: classes.accordingTitle }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>{title}</Typography>
                    <EditIcon
                      className={classes.secondaryHeading}
                      onClick={(): void => {
                        history.push(`/${tabContentMap[tabIndex].key}/${_id}`)
                      }}
                    />
                    <DeleteOutlineIcon
                      className={classes.secondaryHeading}
                      onClick={(): void => {
                        deleteDoc(_id)
                      }}
                    />
                  </AccordionSummary>
                  <Divider />
                  <AccordionDetails>
                    <div>
                      <div className="markdown-body">
                        <span dangerouslySetInnerHTML={{ __html: ShowdownConverter.makeHtml(content) }} />
                      </div>
                      <div>
                        <UiLink
                          component="button"
                          className={classes.button}
                          color="secondary"
                          onClick={(): void => {
                            collpaseItem(isExpanded, index)
                          }}
                        >
                          collapse
                          <ArrowUpwardIcon fontSize="small" />
                        </UiLink>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Button href={`${tabContentMap[tabIndex].key}/add`} color="secondary">
                + Add
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </div>
  )
}
export default QuestionPage
