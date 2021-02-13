import React, { useEffect, useState } from 'react'
import { Row, Col, Badge, message } from 'antd'
import styled from 'styled-components'
import PageHeader from 'components/PageHeader'
import TodoList from 'components/TodoList'
import { useLocation } from 'react-router-dom'

const Divider = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 16px;
  padding-bottom: 8px;
`

type itemType = { [key: string]: string[] }
interface DirectoryType {
  [key: string]: itemType
}
const Home: React.FC = () => {
  const [fileDirs, setFileDirs] = useState({})
  const { hash } = useLocation()
  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        const fileMapResponse = await fetch(`./api/files`)
        const fileMap = await fileMapResponse.json()
        setFileDirs(fileMap)
      } catch (err) {
        message.error(err)
      }
    })()
  }, [])
  useEffect(() => {
    if (hash && hash.substr(1)) {
      const ele = document.getElementById(hash.substr(1))
      ele?.scrollIntoView()
    }
  }, [hash, fileDirs])
  return (
    <>
      <PageHeader />
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={16}>
          <TodoList />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={16}>
          {Object.entries(fileDirs as DirectoryType).map(([categoryName, categoryDirs], index) => (
            <div key={categoryName} style={{ marginTop: '40px' }}>
              <h2 style={{ marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
                <Badge
                  count={`Part ${index + 1}`}
                  style={{ backgroundColor: 'rgb(155, 107, 107)', marginRight: '5px' }}
                />
                {categoryName}{' '}
                <a href={`#${categoryName}`} id={`${categoryName}`}>
                  #
                </a>
              </h2>
              {/* {categoryDirs.map((categoryDir) => */}
              {Object.entries(categoryDirs).map(([fileDirName, fileNames]) => (
                <section key={fileDirName} className="section" style={{ marginBottom: '24px', counterIncrement: 'a' }}>
                  <h3>{fileDirName}</h3>
                  <Divider />
                  <ul className="list">
                    {Array.isArray(fileNames) &&
                      fileNames.map((fileName: string) => (
                        <li className="list_item" key={fileName}>
                          <div>
                            <a href={`./${categoryName}/${fileDirName}/${fileName}#${categoryName}`}>
                              {fileName.replace('.md', '')}
                            </a>
                          </div>
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
              {/* )} */}
            </div>
          ))}
        </Col>
      </Row>
    </>
  )
}
export default Home
