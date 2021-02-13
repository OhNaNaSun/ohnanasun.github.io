import React, { useEffect, useState } from 'react'
import { Divider, message, Collapse } from 'antd'
import { Link } from 'react-router-dom'

import { DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Panel } = Collapse
type itemType = string
interface DirectoryType {
  [key: string]: Array<itemType>
}
interface AppSidebarType {
  currentDirName: string
  currentCateName: string
  currentFileName: string
  isReadOnly: boolean
}
const StyledCollapse = styled(Collapse)`
  font-size: 16px;
  .ant-collapse-item > .ant-collapse-content-box {
    padding-top: 10px;
  }
  .ant-collapse-item > .ant-collapse-header {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`
const AppSidebar: React.FC<AppSidebarType> = ({ currentDirName, currentCateName, currentFileName, isReadOnly }) => {
  const [fileDirs, setFileDirs] = useState({})
  const [defaultFileName, setDefaultName] = useState('')
  const [deletedCount, setDeletedCount] = useState(0)
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const fileListResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/${currentDirName}`)
        const fileList = await fileListResponse.json()
        setFileDirs(fileList)
        if (fileList && typeof fileList === 'object') {
          const firstFileName = ([] as string[]).concat(...Object.values(fileList as DirectoryType))
          setDefaultName(firstFileName[0])
        }
      } catch (err) {
        message.error(err)
      }
    })()
  }, [currentDirName, currentFileName, deletedCount])
  const currentPathName = currentCateName + currentFileName
  const deleteFile = async (filePath: string): Promise<void> => {
    try {
      const deleteFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/${encodeURIComponent(filePath)}`, {
        method: 'DELETE',
      })
      const resData = await deleteFileResponse.json()
      if (resData.statusCode === 200) {
        message.success(resData.message)
        setDeletedCount(deletedCount + 1)
      } else {
        message.error(resData.message)
      }
    } catch (err) {
      message.error(err.message)
    }
  }
  return (
    <StyledCollapse defaultActiveKey={[currentCateName]} ghost>
      {Object.keys(fileDirs).length &&
        Object.entries(fileDirs as DirectoryType).map(([dirName, fileNames]) => (
          <Panel header={<h3>{dirName}</h3>} key={dirName}>
            <Divider style={{ marginTop: '0', marginBottom: '3px' }} />
            <section key={dirName} style={{ margin: '20px 0 5px 20px' }}>
              <ol key={dirName} style={{ columns: 1 }} title={dirName}>
                {Array.isArray(fileNames) &&
                  fileNames.map((fileName: itemType) => (
                    <li
                      className={`list_item ${currentPathName === dirName + fileName ? 'selected' : ''}`}
                      key={`${dirName}_${fileName}`}
                      title={fileName}
                    >
                      <div>
                        <Link to={`../${dirName}/${fileName}`}>{fileName.split('.')[0]}</Link>
                        {!isReadOnly && (
                          <DeleteOutlined
                            style={{ float: 'right', lineHeight: 'inherit' }}
                            onClick={(): void => {
                              deleteFile(`${currentDirName}/${dirName}/${fileName}`)
                            }}
                          />
                        )}
                      </div>
                    </li>
                  ))}
              </ol>
            </section>
          </Panel>
        ))}
    </StyledCollapse>
  )
}
export default AppSidebar
