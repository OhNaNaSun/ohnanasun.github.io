import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import styled from 'styled-components'

const Banner = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/anime-girl.jpeg);
  background-size: cover;
  height: 600px;
  background-position-y: -120px;
`
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
    axios
      .get(`./api/files`)
      .then((res) => {
        setFileDirs(res.data)
      })
      .catch((err) => {})
  }, [])

  return (
    <>
      <Banner />
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={16}>
          {Object.entries(fileDirs as DirectoryType).map(([categoryName, categoryDirs]) => (
            <div key={categoryName} style={{ marginTop: '40px' }}>
              <h2 style={{ marginBottom: '40px' }}>{categoryName}</h2>
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
