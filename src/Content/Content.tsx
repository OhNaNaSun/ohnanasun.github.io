import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MdEditor from './MdEditor'

interface AppContentType {
  currentItem: string
  getMdContent: Function
  isEdit: boolean
}

const AppContent: React.FC<AppContentType> = ({ currentItem, getMdContent, isEdit }) => {
  const [mdContent, setMdContent] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  useEffect(() => {
    if (currentItem.split('/')[1]) {
      axios
        .get(`./api/docs/${currentItem}.md`)
        .then((res) => {
          setMdContent(res.data)
        })
        .catch((err) => {})
    } else {
      setMdContent('')
    }
    setSelectedTab(isEdit ? 'write' : 'preview')
  }, [currentItem, isEdit, setMdContent])

  return (
    <>
      <MdEditor
        mdContent={mdContent}
        initSelectedTab={selectedTab}
        setMdContent={(newValue: string): void => {
          getMdContent(newValue)
        }}
      />
    </>
  )
}
export default AppContent
