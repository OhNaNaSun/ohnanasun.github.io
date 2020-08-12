import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

interface MdEditorType {
  mdContent: string
  getCurrentMdContent: Function
  initSelectedTab: 'write' | 'preview'
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({ mdContent, getCurrentMdContent, initSelectedTab }) => {
  const [value, setValue] = React.useState(mdContent)
  const [selectedTab, setSelectedTab] = React.useState(initSelectedTab)
  useEffect(() => {
    setValue(mdContent)
  }, [mdContent])
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={(newValue): void => {
          setValue(newValue)
          getCurrentMdContent(newValue)
        }}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  )
}
export default MdEditor
