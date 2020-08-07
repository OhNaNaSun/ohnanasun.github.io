import React, { useState } from 'react'
import './App.css'
import { Layout } from 'antd'
import AppHeader from '../Header/Header'
import AppSidebar from '../Sidebar/Sidebar'
import MainContent from '../Content/MainContent'

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
        <MainContent currentItem={currentItem} />
      </Layout>
    </Layout>
  )
}
export default App
