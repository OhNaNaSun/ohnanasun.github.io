import React, { useState, useEffect } from 'react'
import * as Showdown from 'showdown'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const TodoList: React.FC = () => {
  const [todoMdContent, setTodoMdContent] = useState('')
  useEffect(() => {
    ;(async (): Promise<void> => {
      const tutorialReponse = await fetch(`${process.env.REACT_APP_API_URL}/tutorial.md`)
      const tutorialText = await tutorialReponse.text()
      setTodoMdContent(tutorialText)
    })()
  }, [])
  return (
    <Box mt={2}>
      <Paper variant="outlined">
        <Box p={2}>
          <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(todoMdContent) }} />
        </Box>
      </Paper>
    </Box>
  )
}
export default TodoList
