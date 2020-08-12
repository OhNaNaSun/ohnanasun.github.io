import React, { useState } from 'react'
import './App.css'
import { Layout } from 'antd'
import AppHeader from '../Header/Header'
import AppSidebar from '../Sidebar/Sidebar'
import MainContent from '../Content/MainContent'

const App: React.FC = () => {
  const [currentItem, setCurrentItem] = useState('')
  const [refreshSideBarCount, setRefreshSideBarCount] = useState(0)
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSidebar
          setCurrentItem={setCurrentItem}
          addItem={(dirName: string): void => {
            setCurrentItem('')
          }}
          refreshSideBarCount={refreshSideBarCount}
        />
        <MainContent
          currentItem={currentItem}
          saveItemCallback={() => {
            setRefreshSideBarCount(refreshSideBarCount + 1)
          }}
        />
      </Layout>
    </Layout>
  )
}
export default App
