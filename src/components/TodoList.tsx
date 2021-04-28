import React, { useState, useEffect } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'

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
      const tutorialReponse = await fetch(`${process.env.PUBLIC_URL}/api/tutorial.md`)
      const tutorialText = await tutorialReponse.text()
      setTodoMdContent(tutorialText)
    })()
  }, [])
  return (
    <>
      <h2 style={{ marginBottom: '30px' }}>Tutorials</h2>
      <ReactMde
        minPreviewHeight={50}
        value={todoMdContent}
        selectedTab="preview"
        generateMarkdownPreview={(markdown: string): Promise<string> => Promise.resolve(converter.makeHtml(markdown))}
      />
    </>
  )
}
export default TodoList
