import React, { useState, useEffect } from 'react'
import { Layout, message } from 'antd'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import MdContent from './Content/MdContent'
import AppSidebar from './Sidebar'
import BreadCrumb from './BreadCrumb'

const Container: React.FC = () => {
  const { pathname } = useLocation()
  const [, currentDirName, currentCateName, currentFileName] = pathname.split('/')
  const [mdContent, setMdContent] = useState('')
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState('')
  const history = useHistory()

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/api/auth`).then((res) => {
      setIsReadOnly(!res.data)
    })
  }, [])

  const postMdContent = (newFileName: string): void => {
    axios
      .post(`${process.env.PUBLIC_URL}/api/files/upload`, {
        name: `${currentDirName}/${currentCateName}/${newFileName}`,
        mdContent,
      })
      .then((res) => {
        message.success(res.statusText)
        history.push(`/${currentDirName}/${currentCateName}/${newFileName}`)
      })
      .catch((error) => {
        message.error(error.message)
      })
  }
  return (
    <Layout>
      <AppSidebar currentDirName={currentDirName} currentCateName={currentCateName} currentFileName={currentFileName} />
      <Layout style={{ padding: '0 24px 24px' }}>
        <BreadCrumb
          currentDirName={currentDirName}
          currentCateName={currentCateName}
          currentFileName={currentFileName}
          isReadOnly={isReadOnly}
          saveItem={(newFileName: string): void => {
            postMdContent(newFileName)
          }}
          lastUpdateTime={lastUpdateTime}
        />
        <MdContent
          isReadOnly={isReadOnly}
          currentDirName={currentDirName}
          currentCateName={currentCateName}
          currentFileName={currentFileName}
          returnNewMdContent={(value: string): void => {
            setMdContent(value)
          }}
          returnLastUpdateTime={(value: string): void => {
            setLastUpdateTime(value)
          }}
        />
      </Layout>
    </Layout>
  )
}
export default Container
