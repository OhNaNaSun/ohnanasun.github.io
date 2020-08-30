import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout } from 'antd'
import MdEditor from './MdEditor'

const { Content } = Layout
interface MdContentType {
  currentItemPath: string
  returnNewMdContent: Function
}

const MdContent: React.FC<MdContentType> = ({ currentItemPath, returnNewMdContent }) => {
  const [mdContent, setMdContent] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  useEffect(() => {
    if (currentItemPath.split('/')[1]) {
      axios
        .get(`${process.env.PUBLIC_URL}/api${currentItemPath}`)
        .then((res) => {
          setMdContent(res.data)
        })
        .catch((err) => {})
    } else {
      setMdContent('')
    }
  }, [currentItemPath, setMdContent])
  useEffect(() => {
    const fileFullPath = currentItemPath.split('/')
    const isEdit = !fileFullPath[1]
    setSelectedTab(isEdit ? 'write' : 'preview')
  }, [currentItemPath])
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
      />
    </Content>
  )
}
export default MdContent
