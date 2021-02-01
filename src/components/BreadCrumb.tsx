import React from 'react'
import { Input, Space, Row, Col } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

interface BreadCrumbHeaderType {
  currentDirName: string
  currentCateName: string
  isReadOnly: boolean
  lastUpdateTime: string
  fileName: string
  setFileName: Function
}
const BreadCrumbHeader: React.FC<BreadCrumbHeaderType> = ({
  currentDirName,
  currentCateName,
  isReadOnly,
  fileName,
  setFileName,
  lastUpdateTime,
}) => {
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
          <span style={{ marginLeft: '5px' }}>
            <CalendarOutlined /> {lastUpdateTime}
          </span>
        </Col>
      </Row>
    </Space>
  )
}
export default BreadCrumbHeader
