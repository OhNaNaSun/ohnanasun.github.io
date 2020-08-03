import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu
interface DirectoryType {
  [key: string]: string[]
}
interface AppSidebarType {
  setCurrentItem: Function
}
const AppSidebar: React.FC<AppSidebarType> = ({ setCurrentItem }) => {
  const [directory, setDir] = useState({})
  useEffect(() => {
    axios
      .get(`./api/docs/dir.json`)
      .then((res) => {
        setDir(res.data)
      })
      .catch((err) => {})
  }, [])
  useEffect(() => {
    if (Object.keys(directory).length > 0) {
      const firstDir = Object.keys(directory)[0]
      setCurrentItem(`${firstDir}/${(directory as DirectoryType)[firstDir][0]}`)
    }
  }, [directory, setCurrentItem])
  return (
    <Sider width={300} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['Two Sum']}
        defaultOpenKeys={['Algorithm']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {directory &&
          Object.keys(directory as DirectoryType).map((dirName: string) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              {(directory as DirectoryType)[dirName].map((fileName: string) => (
                <Menu.Item
                  key={fileName}
                  title={fileName}
                  onClick={() => {
                    setCurrentItem(`${dirName}/${fileName}`)
                  }}
                >
                  {fileName}
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
      </Menu>
    </Sider>
  )
}
export default AppSidebar
