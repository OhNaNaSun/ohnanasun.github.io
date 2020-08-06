import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

interface MdEditorType {
  mdValue: string
}
type selectedTabType = 'preview' | 'write' | undefined
const loadSuggestions = (text: string): Promise<any> => {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: 'Andre',
          value: '@andre',
        },
        {
          preview: 'Angela',
          value: '@angela',
        },
        {
          preview: 'David',
          value: '@david',
        },
        {
          preview: 'Louise',
          value: '@louise',
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()))
      accept(suggestions)
    }, 250)
  })
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({ mdValue }) => {
  const [value, setValue] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  useEffect(() => {
    setValue(mdValue)
    setSelectedTab(mdValue ? 'preview' : 'write')
  }, [mdValue])
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab as selectedTabType}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown: string): Promise<any> => Promise.resolve(converter.makeHtml(markdown))}
        loadSuggestions={loadSuggestions}
        minEditorHeight={800}
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  )
}
export default MdEditor
