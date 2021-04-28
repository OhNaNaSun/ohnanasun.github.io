import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import { SaveOutlined } from '@ant-design/icons'

interface MdEditorType {
  mdContent: string
  selectedTab?: 'write' | 'preview'
  changeSelectedTab?: (tab: 'preview' | 'write') => void
  readOnly?: boolean
  postMdContent?: (arg0: string) => void
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({ mdContent, selectedTab, readOnly, postMdContent }) => {
  const [selectedTabName, setSelectedTabName] = useState(selectedTab || 'preview')
  const [content, setContent] = useState(mdContent)
  useEffect(() => {
    selectedTab && setSelectedTabName(selectedTab)
  }, [selectedTab])
  useEffect(() => {
    setContent(mdContent)
  }, [mdContent])
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <SaveOutlined
        style={{ fontSize: '1.5rem', position: 'absolute', top: '15px', left: '2%' }}
        onClick={(): void => {
          postMdContent && postMdContent(content)
        }}
      />
      <ReactMde
        minEditorHeight={600}
        value={content}
        onChange={(newValue): void => {
          setContent(newValue)
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
