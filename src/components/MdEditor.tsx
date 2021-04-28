import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'

interface MdEditorType {
  mdContent: string
  changeMdContent: Function
  selectedTab?: 'write' | 'preview'
  changeSelectedTab?: (tab: 'preview' | 'write') => void
  readOnly?: boolean
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({ mdContent, changeMdContent, selectedTab, changeSelectedTab, readOnly }) => {
  const [selectedTabName, setSelectedTabName] = useState(selectedTab || 'preview')
  useEffect(() => {
    selectedTab && setSelectedTabName(selectedTab)
  }, [selectedTab])
  return (
    <div style={{ width: '100%' }}>
      <ReactMde
        minEditorHeight={600}
        value={mdContent}
        onChange={(newValue): void => {
          changeMdContent(newValue)
        }}
        classes={readOnly ? { reactMde: 'hide_toolbar' } : {}}
        selectedTab={selectedTabName as MdEditorType['selectedTab']}
        onTabChange={setSelectedTabName}
        generateMarkdownPreview={(markdown: string): Promise<string> => Promise.resolve(converter.makeHtml(markdown))}
      />
    </div>
  )
}
export default MdEditor
