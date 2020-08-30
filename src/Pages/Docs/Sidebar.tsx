import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Sider } = Layout
const { SubMenu } = Menu
type itemType = string
interface DirectoryType {
  [key: string]: Array<itemType>
}
interface AppSidebarType {
  setCurrentItem: Function
  refreshSideBarCount: number
  currentItemPath: string
}
const AppSidebar: React.FC<AppSidebarType> = ({ currentItemPath, setCurrentItem, refreshSideBarCount }) => {
  const [fileDirs, setFileDirs] = useState({})
  const [, currentDirName, currentCateName, currentFileName] = currentItemPath.split('/')
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/files/${currentDirName}`)
      .then((res) => {
        setFileDirs(res.data)
      })
      .catch((err) => {})
  }, [currentDirName, currentItemPath, refreshSideBarCount])
  return (
    <Sider width={300} className="site-layout-background">
      {Object.keys(fileDirs).length && (
        <Menu mode="inline" selectedKeys={[currentCateName]} style={{ height: '100%', borderRight: 0 }}>
          {Object.entries(fileDirs as DirectoryType).map(([dirName, fileNames]) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              {fileNames.map((fileName: itemType) => (
                <Menu.Item key={fileName} title={fileName}>
                  <Link to={`${fileName}`}>{fileName.split('.')[0]}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      )}
    </Sider>
  )
}
export default AppSidebar
