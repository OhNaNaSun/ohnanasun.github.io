import React, { useState, useEffect } from 'react'
import { Breadcrumb, Input } from 'antd'
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
    setFilePath(fileFullPath[0])
    setCurrentFileName(fileFullPath[1])
  }, [currentItemPath])

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{filePath}</Breadcrumb.Item>
      <Breadcrumb.Item>
        <Input
          style={{ width: '200px', marginRight: '10px' }}
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
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
export default BreadCrumbHeader
