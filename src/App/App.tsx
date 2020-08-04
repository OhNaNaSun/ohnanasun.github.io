import React, { useState } from 'react'
import './App.css'
import { Layout, Breadcrumb } from 'antd'
import axios from 'axios'
import AppContent from '../Content/Content'
import AppHeader from '../Header/Header'
import AppSidebar from '../Sidebar/Sidebar'

const { Content } = Layout
const testPost = () => {
  console.log('post')
  axios.get('./api/upload').then((res) => {
    console.log(res)
  })
}
const App: React.FC = () => {
  const [currentItem, setCurrentItem] = useState('')
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSidebar setCurrentItem={setCurrentItem} />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                testPost()
              }}
            >
              App
            </Breadcrumb.Item>
          </Breadcrumb>
          {currentItem && (
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
          )}
        </Layout>
      </Layout>
    </Layout>
  )
}
export default App
