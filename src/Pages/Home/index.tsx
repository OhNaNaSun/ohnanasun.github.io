import React, { useEffect, useState } from 'react'
import { Row, Col, Badge, message } from 'antd'
import styled from 'styled-components'
import PageHeader from 'components/PageHeader'
import TodoList from './TodoList'

const Divider = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 16px;
  padding-bottom: 8px;
`

type itemType = { [key: string]: string[] }
interface DirectoryType {
  [key: string]: Array<itemType>
}
const Home: React.FC = () => {
  const [fileDirs, setFileDirs] = useState({})
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
                {categoryName}
              </h2>
              {categoryDirs.map((categoryDir) =>
                Object.entries(categoryDir).map(([fileDirName, fileNames]) => (
                  <section
                    key={fileDirName}
                    className="section"
                    style={{ marginBottom: '24px', counterIncrement: 'a' }}
                  >
                    <h3>{fileDirName}</h3>
                    <Divider />
                    <ul className="list">
                      {fileNames.map((fileName: string) => (
                        <li className="list_item" key={fileName}>
                          <div>
                            <a href={`./${categoryName}/${fileDirName}/${fileName}`}>{fileName.replace('.md', '')}</a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))
              )}
            </div>
          ))}
        </Col>
      </Row>
    </>
  )
}
export default Home
