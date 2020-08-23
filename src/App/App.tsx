import React, { useState } from 'react'
import './App.css'
import { Layout, message } from 'antd'
import axios from 'axios'
import MdContent from '../components/Content/MdContent'
import AppHeader from '../components/Header'
import AppSidebar from '../components/Sidebar'
import BreadCrumbHeader from '../components/BreadCrumbHeader'

const App: React.FC = () => {
  const [currentItemPath, setCurrentItemPath] = useState('')
  const [refreshSideBarCount, setRefreshSideBarCount] = useState(0)
  const [mdContent, setMdContent] = useState('')
  const postMdContent = (fileFullPath: string): void => {
    axios.post('./api/files/upload', { name: fileFullPath, mdContent }).then((res) => {
      if (res.status === 201) {
        setCurrentItemPath(fileFullPath)
        setRefreshSideBarCount(refreshSideBarCount + 1)
      }
      message.success(res.statusText)
    })
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSidebar
          currentItemPath={currentItemPath}
          setCurrentItem={setCurrentItemPath}
          refreshSideBarCount={refreshSideBarCount}
        />
        <Layout style={{ padding: '0 24px 24px' }}>
          <BreadCrumbHeader
            currentItemPath={currentItemPath}
            saveItem={(path: string): void => {
              postMdContent(path)
            }}
            addNewItem={(): void => {
              setCurrentItemPath(currentItemPath.split('/')[0])
            }}
          />
          <MdContent
            currentItemPath={currentItemPath}
            returnNewMdContent={(value: string): void => {
              setMdContent(value)
            }}
          />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default App
