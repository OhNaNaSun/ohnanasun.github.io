import React, { useEffect, useState } from 'react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import { SaveOutlined, PlusOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

interface MdEditorType {
  mdContent: string
  selectedTab?: 'write' | 'preview'
  changeSelectedTab?: (tab: 'preview' | 'write') => void
  readOnly?: boolean
  postMdContent?: (arg0: string) => void
  currentDirName?: string
  currentCateName?: string
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})
const MdEditor: React.FC<MdEditorType> = ({
  currentDirName,
  currentCateName,
  mdContent,
  selectedTab,
  readOnly,
  postMdContent,
}) => {
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
      {!readOnly && (
        <span style={{ fontSize: '1.5rem', position: 'absolute', top: '7px', left: '1%' }}>
          <Link to={`/${currentDirName}/${currentCateName}/add`}>
            <PlusOutlined style={{ fontSize: '1.5rem' }} />
          </Link>
          <SaveOutlined
            style={{ marginLeft: '10px' }}
            onClick={(): void => {
              postMdContent && postMdContent(content)
            }}
          />
        </span>
      )}
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
