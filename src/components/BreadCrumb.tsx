import React, { useState, useEffect } from 'react'
import { Input, Space, Row, Col } from 'antd'
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
    <Space direction="vertical" style={{ width: '100%', margin: '16px 0' }}>
      <Space size="middle">
        <span>
          {currentDirName} / {currentCateName} /
        </span>
      </Space>
      <Row>
        <Col flex="auto">
          <Input
            value={fileName}
            onChange={(e): void => {
              setFileName(e.target.value)
            }}
            readOnly={isReadOnly}
          />
        </Col>
        <Col span="3">
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
          <span style={{ marginLeft: '5px' }}>
            <CalendarOutlined /> {lastUpdateTime}
          </span>
        </Col>
      </Row>
    </Space>
  )
}
export default BreadCrumbHeader
