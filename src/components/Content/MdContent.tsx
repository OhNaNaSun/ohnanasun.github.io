import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MdEditor from './MdEditor'

interface MdContentType {
  currentItemPath: string
  isEdit: boolean
  changeMdContent: Function
}

const MdContent: React.FC<MdContentType> = ({ currentItemPath, changeMdContent, isEdit }) => {
  const [mdContent, setMdContent] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  useEffect(() => {
    if (currentItemPath.split('/')[1]) {
      axios
        .get(`./api/files/${encodeURIComponent(currentItemPath)}`)
        .then((res) => {
          setMdContent(res.data)
        })
        .catch((err) => {})
    } else {
      setMdContent('')
    }
  }, [currentItemPath, setMdContent])
  useEffect(() => {
    setSelectedTab(isEdit ? 'write' : 'preview')
  }, [isEdit])
  return (
    <>
      <MdEditor
        mdContent={mdContent}
        initSelectedTab={selectedTab as 'write' | 'preview'}
        changeMdContent={changeMdContent}
      />
    </>
  )
}
export default MdContent
