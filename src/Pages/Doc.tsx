import React, { useState, useEffect } from 'react'
import { message, Row, Col } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import BreadCrumb from 'components/BreadCrumb'
import MdContent from 'components/MdContent'
import AppSidebar from 'components/Sidebar'

const Doc: React.FC = () => {
  const { pathname } = useLocation()
  const [, currentDirName, currentCateName, currentPathFileName] = pathname.split('/')
  const currentFileName = currentPathFileName === 'add' ? '' : currentPathFileName
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState('')
  const history = useHistory()

  const [fileName, setFileName] = useState(currentFileName)
  useEffect(() => {
    setFileName(currentFileName)
  }, [currentFileName])
  useEffect(() => {
    ;(async (): Promise<void> => {
      const authResponse = await fetch(`${process.env.PUBLIC_URL}/api/auth`)
      const authData = await authResponse.json()
      setIsReadOnly(!authData)
    })()
  }, [])

  const postMdContent = async (newFileName: string, content: string): Promise<void> => {
    try {
      const uploadFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: `${currentDirName}/${currentCateName}/${newFileName}`,
          mdContent: content,
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
            isReadOnly={isReadOnly}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '20px 0', paddingBottom: '50px' }}>
        <Col span={18}>
          <div className="scrollable-container">
            <BreadCrumb
              currentDirName={currentDirName}
              currentCateName={currentCateName}
              isReadOnly={isReadOnly}
              fileName={fileName}
              setFileName={setFileName}
              lastUpdateTime={lastUpdateTime}
            />
            <MdContent
              saveItem={(newFileName: string, content: string): void => {
                postMdContent(newFileName, content)
              }}
              isReadOnly={isReadOnly}
              fileName={fileName}
              currentDirName={currentDirName}
              currentCateName={currentCateName}
              currentFileName={currentFileName}
              returnLastUpdateTime={(value: string): void => {
                setLastUpdateTime(value)
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}
export default Doc
