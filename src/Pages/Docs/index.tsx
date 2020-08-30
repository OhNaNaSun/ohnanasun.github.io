import React, { useState } from 'react'
import { Layout, message } from 'antd'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import MdContent from './Content/MdContent'
import AppSidebar from './Sidebar'
import BreadCrumbHeader from './BreadCrumbHeader'

const Container: React.FC = () => {
  const { pathname } = useLocation()
  const [, currentDirName, currentCateName, currentFileName] = pathname.split('/')
  const [mdContent, setMdContent] = useState('')
  const postMdContent = (newFileName: string): void => {
    axios
      .post('./api/files/upload', { name: `${currentDirName}\${currentCateName}\${newFileName}`, mdContent })
      .then((res) => {
        message.success(res.statusText)
      })
  }
  return (
    <Layout>
      <AppSidebar currentDirName={currentDirName} currentCateName={currentCateName} currentFileName={currentFileName} />
      <Layout style={{ padding: '0 24px 24px' }}>
        <BreadCrumbHeader
          currentDirName={currentDirName}
          currentCateName={currentCateName}
          currentFileName={currentFileName}
          saveItem={(newFileName: string): void => {
            postMdContent(newFileName)
          }}
          addNewItem={(): void => {
            // setCurrentItemPath(currentItemPath.split('/')[0])
          }}
        />
        <MdContent
          currentItemPath={pathname}
          returnNewMdContent={(value: string): void => {
            setMdContent(value)
          }}
        />
      </Layout>
    </Layout>
  )
}
export default Container
