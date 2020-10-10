import React, { useState, useEffect } from 'react'
import { message, Row, Col } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import MdContent from './Content/MdContent'
import AppSidebar from './Sidebar'
import BreadCrumb from './BreadCrumb'

const Container: React.FC = () => {
  const { pathname } = useLocation()
  const [, currentDirName, currentCateName, currentPathFileName] = pathname.split('/')
  const currentFileName = currentPathFileName === 'add' ? '' : currentPathFileName
  const [mdContent, setMdContent] = useState('')
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState('')
  const history = useHistory()

  useEffect(() => {
    ;(async (): Promise<void> => {
      const authResponse = await fetch(`${process.env.PUBLIC_URL}/api/auth`)
      const authData = await authResponse.json()
      setIsReadOnly(!authData)
    })()
  }, [])

  const postMdContent = async (newFileName: string): Promise<void> => {
    try {
      const uploadFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: `${currentDirName}/${currentCateName}/${newFileName}`,
          mdContent,
        }),
      })
      const { statusText } = uploadFileResponse
      message.success(statusText)
      history.push(`/${currentDirName}/${currentCateName}/${newFileName}`)
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <>
      <Row justify="center" style={{ marginTop: '20px', marginLeft: '-20px' }}>
        <Col span={18}>
          <AppSidebar
            currentDirName={currentDirName}
            currentCateName={currentCateName}
            currentFileName={currentFileName}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '20px 0' }}>
        <Col span={18}>
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
        </Col>
      </Row>
    </>
  )
}
export default Container
