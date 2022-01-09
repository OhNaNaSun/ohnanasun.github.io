import React, { useEffect, useState } from 'react'
import MdEditor from './MdEditor'

interface MdContentType {
  currentDirName: string
  currentCateName: string
  currentFileName: string
  isReadOnly: boolean
  returnLastUpdateTime: Function
  saveItem: Function
  fileName: string
}

const MdContent: React.FC<MdContentType> = ({
  currentDirName,
  currentCateName,
  currentFileName,
  isReadOnly,
  returnLastUpdateTime,
  saveItem,
  fileName,
}) => {
  const [mdContentState, setMdContentState] = useState('')
  const [selectedTab, setSelectedTab] = useState('preview')
  const [lastUpdatedTime, setLastUpdatedTime] = useState('')

  useEffect(() => {
    ;(async (): Promise<void> => {
      if (currentFileName) {
        const fileResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/${currentDirName}/${currentCateName}/${currentFileName}`
        )
        setLastUpdatedTime(
          new Date(fileResponse.headers.get('last-modified') || '')?.toLocaleDateString('en-us', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        )
        const fileText = await fileResponse.text()
        setMdContentState(fileText)
      } else {
        setMdContentState('')
      }
    })()
  }, [currentCateName, currentDirName, currentFileName, setLastUpdatedTime])
  useEffect(() => {
    returnLastUpdateTime(lastUpdatedTime)
  }, [lastUpdatedTime, returnLastUpdateTime])
  useEffect(() => {
    setSelectedTab(!currentFileName ? 'write' : 'preview')
  }, [currentFileName])

  return (
    <div
      className="site-layout-background scrollable-container"
      style={{
        margin: '0 0 0 -10px',
        minHeight: 280,
      }}
    >
      <MdEditor
        currentDirName={currentDirName}
        currentCateName={currentCateName}
        postMdContent={(content: string): void => saveItem(fileName, content)}
        mdContent={mdContentState}
        selectedTab={selectedTab as 'preview' | 'write'}
        readOnly={isReadOnly}
      />
    </div>
  )
}
export default MdContent
