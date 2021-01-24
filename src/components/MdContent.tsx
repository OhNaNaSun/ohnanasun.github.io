import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import MdEditor from './MdEditor'

const { Content } = Layout
interface MdContentType {
  returnNewMdContent: Function
  currentDirName: string
  currentCateName: string
  currentFileName: string
  isReadOnly: boolean
  returnLastUpdateTime: Function
}

const MdContent: React.FC<MdContentType> = ({
  returnNewMdContent,
  currentDirName,
  currentCateName,
  currentFileName,
  isReadOnly,
  returnLastUpdateTime,
}) => {
  const [mdContent, setMdContent] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  const [lastUpdatedTime, setLastUpdatedTime] = useState('')
  useEffect(() => {
    ;(async (): Promise<void> => {
      if (currentFileName) {
        const fileResponse = await fetch(
          `${process.env.PUBLIC_URL}/api/${currentDirName}/${currentCateName}/${currentFileName}`
        )
        setLastUpdatedTime(
          new Date(fileResponse.headers.get('last-modified') || '')?.toLocaleDateString('en-us', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        )
        const fileText = await fileResponse.text()
        setMdContent(fileText)
      } else {
        setMdContent('')
      }
    })()
  }, [currentCateName, currentDirName, currentFileName, setLastUpdatedTime, setMdContent])
  useEffect(() => {
    returnLastUpdateTime(lastUpdatedTime)
  }, [lastUpdatedTime, returnLastUpdateTime])
  useEffect(() => {
    setSelectedTab(!currentFileName ? 'write' : 'preview')
  }, [currentFileName])
  useEffect(() => {
    returnNewMdContent(mdContent)
  }, [mdContent, returnNewMdContent])
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '0 0 0 -10px',
        minHeight: 280,
      }}
    >
      <MdEditor
        mdContent={mdContent}
        selectedTab={selectedTab as 'preview' | 'write'}
        changeSelectedTab={setSelectedTab}
        changeMdContent={setMdContent}
        readOnly={isReadOnly}
      />
    </Content>
  )
}
export default MdContent
