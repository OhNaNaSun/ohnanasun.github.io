import React, { useEffect, useState } from 'react'
import { Divider, message } from 'antd'
import { Link } from 'react-router-dom'

import { DeleteOutlined } from '@ant-design/icons'

type itemType = string
interface DirectoryType {
  [key: string]: Array<itemType>
}
interface AppSidebarType {
  currentDirName: string
  currentCateName: string
  currentFileName: string
}
const AppSidebar: React.FC<AppSidebarType> = ({ currentDirName, currentCateName, currentFileName }) => {
  const [fileDirs, setFileDirs] = useState({})
  const [defaultFileName, setDefaultName] = useState('')
  const [deletedCount, setDeletedCount] = useState(0)
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/api/files/${currentDirName}`)
      .then((res) => res.json())
      .then((data) => {
        setFileDirs(data)
        if (data && typeof data === 'object') {
          const firstFileName = ([] as string[]).concat(...Object.values(data as DirectoryType))
          setDefaultName(firstFileName[0])
        }
      })
      .catch((err) => {})
  }, [currentDirName, currentFileName, deletedCount])
  const currentPathName = currentCateName + currentFileName
  const deleteFile = (filePath: string): void => {
    fetch(`${process.env.PUBLIC_URL}/api/files/${encodeURIComponent(filePath)}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data: { statusCode: number; message: string }) => {
        if (data.statusCode === 200) {
          message.success(data.message)
          setDeletedCount(deletedCount + 1)
        } else {
          message.error(data.message)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }
  return (
    <>
      {Object.keys(fileDirs).length &&
        Object.entries(fileDirs as DirectoryType).map(([dirName, fileNames]) => (
          <section key={dirName} style={{ marginBottom: '5px', counterIncrement: 'a' }}>
            <h3>{dirName}</h3>
            <Divider style={{ margin: '5px 0' }} />
            <ul key={dirName} style={{ columns: 2 }} className="list" title={dirName}>
              {fileNames.map((fileName: itemType) => (
                <li
                  className={`list_item ${currentPathName === dirName + fileName ? 'selected' : ''}`}
                  key={`${dirName}_${fileName}`}
                  title={fileName}
                >
                  <div>
                    <Link to={`../${dirName}/${fileName}`}>{fileName.split('.')[0]}</Link>
                    <DeleteOutlined
                      style={{ float: 'right' }}
                      onClick={(): void => {
                        deleteFile(`${currentDirName}/${dirName}/${fileName}`)
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </>
  )
}
export default AppSidebar
