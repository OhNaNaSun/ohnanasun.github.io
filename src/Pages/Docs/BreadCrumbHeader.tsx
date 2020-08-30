import React, { useState, useEffect } from 'react'
import { Input, Space } from 'antd'
import { SaveOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

interface BreadCrumbHeaderType {
  saveItem: Function
  addNewItem: Function
  currentDirName: string
  currentCateName: string
  currentFileName: string
}
const BreadCrumbHeader: React.FC<BreadCrumbHeaderType> = ({
  saveItem,
  addNewItem,
  currentDirName,
  currentCateName,
  currentFileName,
}) => {
  const [fileName, setFileName] = useState(currentFileName)
  useEffect(() => {
    setFileName(currentFileName)
  }, [currentFileName])
  return (
    <div style={{ margin: '16px 0' }}>
      <Space>
        <Link className="text" to="/">
          <HomeOutlined />
        </Link>
        {currentDirName} / {currentCateName} /
        <Input
          style={{ width: '300px' }}
          value={fileName}
          onChange={(e): void => {
            setFileName(e.target.value)
          }}
        />
        <SaveOutlined
          onClick={(): void => {
            saveItem(fileName)
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
