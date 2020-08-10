import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout, Menu } from 'antd'
import { UserOutlined, PlusOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu
interface DirectoryType {
  [key: string]: string[]
}
interface AppSidebarType {
  setCurrentItem: Function
  addItem: Function
}
const AppSidebar: React.FC<AppSidebarType> = ({ setCurrentItem, addItem }) => {
  const [fileDirs, setFileDirs] = useState({})
  useEffect(() => {
    axios
      .get(`./api/files`)
      .then((res) => {
        setFileDirs(res.data)
      })
      .catch((err) => {})
  }, [])
  console.log('filedirs', fileDirs)
  return (
    <Sider width={300} className="site-layout-background">
      {Object.keys(fileDirs).length && (
        <Menu
          mode="inline"
          defaultSelectedKeys={[(fileDirs as DirectoryType).Algorithm[0]]}
          defaultOpenKeys={['Algorithm']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {Object.keys(fileDirs).map((dirName: string) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              <Menu.Item
                key={dirName}
                title="Add"
                onClick={(): void => {
                  console.log(dirName)
                  setCurrentItem(dirName)
                }}
              >
                <PlusOutlined />
              </Menu.Item>
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
