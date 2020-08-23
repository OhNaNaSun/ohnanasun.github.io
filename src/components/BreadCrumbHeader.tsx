import React, { useState, useEffect } from 'react'
import { Input, Space } from 'antd'
import { SaveOutlined, PlusOutlined } from '@ant-design/icons'

interface BreadCrumbHeaderType {
  currentItemPath: string
  saveItem: Function
  addNewItem: Function
}
const BreadCrumbHeader: React.FC<BreadCrumbHeaderType> = ({ currentItemPath, saveItem, addNewItem }) => {
  const [filePath, setFilePath] = useState('')
  const [currentFileName, setCurrentFileName] = useState('')

  useEffect(() => {
    const fileFullPath = currentItemPath.split('/')
    const fileName = fileFullPath.pop()
    setFilePath(fileFullPath.join(' / '))
    setCurrentFileName(fileName as string)
  }, [currentItemPath])

  return (
    <div style={{ margin: '16px 0' }}>
      <Space>
        {filePath} /
        <Input
          style={{ width: '200px' }}
          value={currentFileName}
          onChange={(e): void => {
            setCurrentFileName(e.target.value)
          }}
        />
        <SaveOutlined
          onClick={(): void => {
            saveItem(`${filePath}/${currentFileName}`)
          }}
        />
        <PlusOutlined
          onClick={(): void => {
            addNewItem()
          }}
        />
      </Space>
    </div>
  )
}
export default BreadCrumbHeader
