import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MdEditor from './MdEditor'

interface MdContentType {
  currentItem: string
  getMdContent: Function
  isEdit: boolean
}

const MdContent: React.FC<MdContentType> = ({ currentItem, getMdContent, isEdit }) => {
  const [mdContent, setMdContent] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  useEffect(() => {
    if (currentItem.split('/')[1]) {
      axios
        .get(`./api/files/${encodeURIComponent(currentItem)}`)
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
        initSelectedTab={selectedTab as 'write' | 'preview'}
        getCurrentMdContent={(newValue: string): void => {
          getMdContent(newValue)
        }}
      />
    </>
  )
}
export default MdContent
