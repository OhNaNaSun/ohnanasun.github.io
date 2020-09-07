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
    if (currentFileName) {
      fetch(`${process.env.PUBLIC_URL}/api/${currentDirName}/${currentCateName}/${currentFileName}`)
        .then((res) => {
          setLastUpdatedTime(
            new Date(res.headers.get('last-modified') || '')?.toLocaleDateString('en-us', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          )
          return res.text()
        })
        .then((data) => {
          setMdContent(data)
        })
        .catch((err) => {})
    } else {
      setMdContent('')
    }
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
        margin: 0,
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
