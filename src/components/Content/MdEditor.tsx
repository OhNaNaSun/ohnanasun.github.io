import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

interface MdEditorType {
  mdContent: string
  changeMdContent: Function
  initSelectedTab: 'write' | 'preview'
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({ mdContent, changeMdContent, initSelectedTab }) => {
  const [value, setValue] = useState(mdContent)
  const [selectedTab, setSelectedTab] = useState(initSelectedTab)
  useEffect(() => {
    setValue(mdContent)
  }, [mdContent])
  useEffect(() => {
    setSelectedTab(initSelectedTab)
  }, [initSelectedTab])
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={(newValue): void => {
          setValue(newValue)
          changeMdContent(newValue)
        }}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown: string): Promise<any> => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  )
}
export default MdEditor
