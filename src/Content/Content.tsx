import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SaveOutlined } from '@ant-design/icons'
import MdEditor from './MdEditor'

interface AppContentType {
  currentItem: string
}

const AppContent: React.FC<AppContentType> = ({ currentItem }) => {
  const [mdContent, setMdContent] = useState('')
  useEffect(() => {
    if (currentItem) {
      axios
        .get(`./api/docs/${currentItem}.md`)
        .then((res) => {
          setMdContent(res.data)
        })
        .catch((err) => {})
    } else {
      setMdContent('')
    }
  }, [currentItem])
  const postMdContent = () => {
    console.log('post')
    axios.post('./api/upload', { name: currentItem, age: 12 }).then((res) => {
      console.log(res)
    })
  }
  return (
    <>
      <SaveOutlined
        onClick={() => {
          postMdContent()
        }}
      />
      <MdEditor mdValue={mdContent} />
    </>
  )
}
export default AppContent
