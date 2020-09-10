import React, { useState, useEffect } from 'react'
import { Input, Space } from 'antd'
import { SaveOutlined, PlusOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons'

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
        <Link className="text" to="/">
          <HomeOutlined />
        </Link>
        <span>
          {currentDirName} / {currentCateName} /
        </span>
        <Input
          style={{ width: '300px' }}
          value={fileName}
          onChange={(e): void => {
            setFileName(e.target.value)
          }}
          readOnly={isReadOnly}
        />
        {!isReadOnly && (
          <>
            <SaveOutlined
              onClick={(): void => {
                saveItem(fileName)
              }}
            />
            <Link to={`/${currentDirName}/${currentCateName}/add`}>
              <PlusOutlined />
            </Link>
          </>
        )}
        <span>
          <CalendarOutlined /> {lastUpdateTime}
        </span>
      </Space>
    </div>
  )
}
export default BreadCrumbHeader
