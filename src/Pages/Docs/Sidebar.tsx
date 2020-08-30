import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

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
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/api/files/${currentItemPath.split('/')[1]}`)
      .then((res) => {
        setFileDirs(res.data)
      })
      .catch((err) => {})
  }, [currentItemPath, refreshSideBarCount])
  useEffect(() => {
    if (Object.keys(fileDirs).length > 0) {
      setCurrentItem(currentItemPath || `${Object.keys(fileDirs)[0]}/${Object.values(fileDirs as DirectoryType)[0][0]}`)
    }
  }, [currentItemPath, fileDirs, setCurrentItem])
  return (
    <Sider width={300} className="site-layout-background">
      {Object.keys(fileDirs).length && (
        <Menu mode="inline" selectedKeys={[currentItemPath.split('/')[1]]} style={{ height: '100%', borderRight: 0 }}>
          {Object.entries(fileDirs as DirectoryType).map(([dirName, fileNames]) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              {fileNames.map((fileName: itemType) => (
                <Menu.Item
                  key={fileName}
                  title={fileName}
                  onClick={(): void => {
                    setCurrentItem(`${dirName}/${fileName}`)
                  }}
                >
                  {fileName.split('.')[0]}
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
