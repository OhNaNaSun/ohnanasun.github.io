import React from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

interface MdEditorType {
  mdContent: string
  changeMdContent: Function
  selectedTab: 'write' | 'preview'
  changeSelectedTab: (tab: 'preview' | 'write') => void
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({ mdContent, changeMdContent, selectedTab, changeSelectedTab }) => {
  return (
    <div className="container">
      <ReactMde
        minEditorHeight={600}
        value={mdContent}
        onChange={(newValue): void => {
          changeMdContent(newValue)
        }}
        selectedTab={selectedTab as MdEditorType['selectedTab']}
        onTabChange={changeSelectedTab}
        generateMarkdownPreview={(markdown: string): Promise<any> => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  )
}
export default MdEditor
