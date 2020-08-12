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
  refreshSideBarCount: number
}
const AppSidebar: React.FC<AppSidebarType> = ({ setCurrentItem, addItem, refreshSideBarCount }) => {
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
      setCurrentItem(`${Object.keys(fileDirs)[0]}/${Object.values(fileDirs as DirectoryType)[0][0]}`)
    }
  }, [fileDirs, setCurrentItem])

  return (
    <Sider width={300} className="site-layout-background">
      {Object.keys(fileDirs).length && (
        <Menu
          mode="inline"
          defaultSelectedKeys={[Object.values(fileDirs as DirectoryType)[0][0]]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {Object.keys(fileDirs).map((dirName: string) => (
            <SubMenu key={dirName} icon={<UserOutlined />} title={dirName}>
              <Menu.Item
                key={`${dirName}_add`}
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
