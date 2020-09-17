import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'

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
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/api/files/${currentDirName}`)
      .then((res) => res.json())
      .then((data) => {
        setFileDirs(data)
      })
      .catch((err) => {})
  }, [currentDirName, currentFileName])
  const currentPathName = currentCateName + currentFileName
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
