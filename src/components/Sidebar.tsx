import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu
interface DirectoryType {
  [key: string]: string[]
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
      .get(`./api/files`)
      .then((res) => {
        setFileDirs(res.data)
      })
      .catch((err) => {})
  }, [refreshSideBarCount])
  useEffect(() => {
    if (Object.keys(fileDirs).length > 0) {
      setCurrentItem(currentItemPath || `${Object.keys(fileDirs)[0]}/${Object.values(fileDirs as DirectoryType)[0][0]}`)
    }
  }, [currentItemPath, fileDirs, setCurrentItem])
  return (
    <Sider width={300} className="site-layout-background">
      {Object.keys(fileDirs).length && (
        <Menu mode="inline" selectedKeys={[currentItemPath.split('/')[1]]} style={{ height: '100%', borderRight: 0 }}>
          {Object.keys(fileDirs).map((dirName: string) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              {(fileDirs as DirectoryType)[dirName].map((fileName: string) => (
                <Menu.Item
                  key={fileName}
                  title={fileName}
                  onClick={(): void => {
                    setCurrentItem(`${dirName}/${fileName}`)
                  }}
                >
                  {fileName}
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
