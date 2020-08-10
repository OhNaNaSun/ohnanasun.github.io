import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Layout, Breadcrumb, Input } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import AppContent from './Content'

const { Content } = Layout
interface MainContentType {
  currentItem: string
}
const MainContent: React.FC<MainContentType> = ({ currentItem }) => {
  const [mdContent, setMdContent] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [filePath, setFilePath] = useState('')
  const [currentFileName, setCurrentFileName] = useState('')
  const postMdContent = (): void => {
    axios.post('./api/upload', { name: `${filePath}/${currentFileName}.md`, mdContent }).then((res) => {
      console.log(res)
    })
  }
  useEffect(() => {
    const fileFullPath = currentItem.split('/')
    setFilePath(fileFullPath[0])
    setIsEdit(!fileFullPath[1])
    setCurrentFileName(fileFullPath[1])
  }, [currentItem])
  const getAllDocs = () => {
    axios.get('./api/files/JavaScript').then((res) => {
      console.log('response', res)
    })
  }
  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item
          onClick={() => {
            console.log('get all docs')
            getAllDocs()
          }}
        >
          {filePath}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Input
            style={{ width: '200px', marginRight: '10px' }}
            value={currentFileName}
            onChange={(e): void => {
              console.log('onchange', e.target.value)
              setCurrentFileName(e.target.value)
            }}
          />
          <SaveOutlined
            onClick={(): void => {
              postMdContent()
            }}
          />
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {currentItem && (
          <AppContent
            currentItem={currentItem}
            isEdit={isEdit}
            getMdContent={(value: string): void => {
              setMdContent(value)
            }}
          />
        )}
      </Content>
    </Layout>
  )
}
export default MainContent
