import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import MdContent from './MdContent'

const { Content } = Layout
interface MainContentType {
  currentItemPath: string
  changeMdContent: Function
}
const MainContent: React.FC<MainContentType> = ({ currentItemPath, changeMdContent }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [initFileFullPath, setInitFileFullPath] = useState(currentItemPath)
  useEffect(() => {
    const fileFullPath = currentItemPath.split('/')
    setIsEdit(!fileFullPath[1])
    setInitFileFullPath(currentItemPath)
  }, [currentItemPath])
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 280,
      }}
    >
      {initFileFullPath && (
        <MdContent currentItemPath={initFileFullPath} isEdit={isEdit} changeMdContent={changeMdContent} />
      )}
    </Content>
  )
}
export default MainContent
