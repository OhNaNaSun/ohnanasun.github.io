import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const AppContent: React.FC = () => {
  const [mdContent, setMdContent] = useState('')
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/JS/feature.md`)
      .then((res) => {
        setMdContent(res.data)
      })
      .catch((err) => {})
  })
  return <ReactMarkdown source={mdContent} />
}
export default AppContent
