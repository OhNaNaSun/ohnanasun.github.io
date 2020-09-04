import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    axios.get(`${process.env.PUBLIC_URL}/api/tutorial.md`).then((res) => {
      setTodoMdContent(res.data)
    })
  }, [])
  return (
    <>
      <h2 style={{ marginBottom: '30px' }}>Tutorials</h2>
      <ReactMde
        minPreviewHeight={50}
        value={todoMdContent}
        classes={{ reactMde: 'hide_toolbar no_border' }}
        selectedTab="preview"
        generateMarkdownPreview={(markdown: string): Promise<any> => Promise.resolve(converter.makeHtml(markdown))}
      />
    </>
  )
}
export default TodoList
