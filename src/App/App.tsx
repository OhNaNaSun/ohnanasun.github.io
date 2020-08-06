import React, { useState } from 'react'
import './App.css'
import { Layout, Breadcrumb } from 'antd'
import axios from 'axios'
import { SaveOutlined } from '@ant-design/icons'
import AppContent from '../Content/Content'
import AppHeader from '../Header/Header'
import AppSidebar from '../Sidebar/Sidebar'

const { Content } = Layout
const testPost = () => {
  console.log('post')
  axios.post('./api/upload', { name: 'gaga', age: 12 }).then((res) => {
    console.log(res)
  })
}
const App: React.FC = () => {
  const [currentItem, setCurrentItem] = useState('')
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSidebar
          setCurrentItem={setCurrentItem}
          addItem={(dirName: string): void => {
            setCurrentItem('')
          }}
        />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                testPost()
              }}
            >
              <SaveOutlined />
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <AppContent currentItem={currentItem} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default App
