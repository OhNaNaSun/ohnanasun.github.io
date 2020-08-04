import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

const loadSuggestions = (text) => {
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
const MdEditor: React.FC = ({ mdValue }) => {
  const [value, setValue] = React.useState('')
  const [selectedTab, setSelectedTab] = React.useState('preview')
  useEffect(() => {
    setValue(mdValue)
  }, [mdValue])
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
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
