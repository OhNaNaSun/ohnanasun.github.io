import React, { useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'

type QuestionMapType = { content: string; title: string }[]

const tabContentMap = [
  { key: 'javascript', name: 'JavaScript' },
  { key: 'html', name: 'HTML' },
  { key: 'css', name: 'CSS' },
]
const QuestionPage: React.FC = () => {
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
  console.log(questionList)
  return (
    <div style={{ margin: '20px auto', width: '90%' }}>
      <Tabs value={tabIndex} onChange={handleChange}>
        {tabContentMap.map(({ key, name }) => (
          <Tab key={key} label={name} />
        ))}
      </Tabs>
      <div role="tabpanel">
        <Box p={3}>
          <List>
            {questionList?.map(({ title, content }, index) => (
              <ListItem key={index}>
                <Typography>
                  {title}: {content}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </div>
  )
}
export default QuestionPage
