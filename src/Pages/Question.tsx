import React, { useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import * as Showdown from 'showdown'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

type QuestionMapType = { content: string; title: string }[]
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const tabContentMap = [
  { key: 'javascript', name: 'JavaScript' },
  { key: 'html', name: 'HTML' },
  { key: 'css', name: 'CSS' },
]
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      // flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    questionBox: {
      backgroundColor: '#2D333B',
    },
  })
)
const QuestionPage: React.FC = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChangeExpand = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const [tabIndex, setTabIndex] = React.useState(0)
  const [questionList, setQuestionList] = useState<QuestionMapType | null>(null)
  useEffect(() => {
    ;(async (): Promise<void> => {
      const fileMapResponse = await fetch(`./api/documents/${tabContentMap[tabIndex].key}`)
      const fileMap = await fileMapResponse.json()
      setQuestionList(fileMap)
    })()
  }, [tabIndex])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number): void => {
    setTabIndex(newValue)
  }
  return (
    <div style={{ margin: '20px auto', width: '90%' }}>
      <Tabs value={tabIndex} onChange={handleChange}>
        {tabContentMap.map(({ key, name }) => (
          <Tab key={key} label={name} />
        ))}
      </Tabs>
      <div role="tabpanel">
        <Box p={3} className={classes.questionBox}>
          <div>
            {questionList?.map(({ title, content }, index) => (
              <Accordion key={index} expanded onChange={handleChangeExpand('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                  <Typography className={classes.heading}>{title}</Typography>
                  {/* <Typography className={classes.secondaryHeading} /> */}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="markdown-body">
                      <span dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <Button target="_blank" href={`${tabContentMap[tabIndex].key}/add`} color="secondary">
            + Add
          </Button>
        </Box>
      </div>
    </div>
  )
}
export default QuestionPage
function rgb(
  arg0: number,
  arg1: number,
  arg2: number
): string | import('@material-ui/styles').PropsFunc<{}, string | undefined> | undefined {
  throw new Error('Function not implemented.')
}
