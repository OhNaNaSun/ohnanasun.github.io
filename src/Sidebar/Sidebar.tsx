import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu
interface DirectoryType {
  [key: string]: string[]
}
const AppSidebar: React.FC = () => {
  const [directory, setDir] = useState({})
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/dir.json`)
      .then((res) => {
        setDir(res.data)
      })
      .catch((err) => {})
  }, [])
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['Two Sum']}
        defaultOpenKeys={['Algorithm']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {directory &&
          Object.keys(directory as DirectoryType).map((dirName: string) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              {(directory as DirectoryType)[dirName].map((item: string) => (
                <Menu.Item key={item}>{item}</Menu.Item>
              ))}
            </SubMenu>
          ))}
      </Menu>
    </Sider>
  )
}
export default AppSidebar
