import React, { useState, useEffect } from 'react'
import { Input, Space } from 'antd'
import { SaveOutlined, PlusOutlined, CalendarOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'

interface BreadCrumbHeaderType {
  saveItem: Function
  currentDirName: string
  currentCateName: string
  currentFileName: string
  isReadOnly: boolean
  lastUpdateTime: string
}
const BreadCrumbHeader: React.FC<BreadCrumbHeaderType> = ({
  saveItem,
  currentDirName,
  currentCateName,
  currentFileName,
  isReadOnly,
  lastUpdateTime,
}) => {
  const [fileName, setFileName] = useState(currentFileName)
  useEffect(() => {
    setFileName(currentFileName)
  }, [currentFileName])
  return (
    <div style={{ margin: '16px 0' }}>
      <Space size="middle">
        <span>
          {currentDirName} / {currentCateName} /
        </span>
      </Space>
      <br />
      <Input
        value={fileName}
        style={{ display: 'table-cell', width: '100%' }}
        onChange={(e): void => {
          setFileName(e.target.value)
        }}
        readOnly={isReadOnly}
      />
      {!isReadOnly && (
        <span style={{ display: 'table-cell', width: '200px' }}>
          <SaveOutlined
            onClick={(): void => {
              saveItem(fileName)
            }}
          />
          <Link to={`/${currentDirName}/${currentCateName}/add`}>
            <PlusOutlined />
          </Link>
        </span>
      )}
      <span style={{ display: 'table-cell', width: '300px' }}>
        <CalendarOutlined /> {lastUpdateTime}
      </span>
    </div>
  )
}
export default BreadCrumbHeader
