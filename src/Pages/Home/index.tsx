import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Popconfirm, Button } from 'antd'
import styled from 'styled-components'
import Typist from 'react-typist'

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
      .catch((err) => { })
  }, [])

  return (
    <>
      <Banner>
        <div style={{fontSize: '16px', fontFamily: 'Courier', position: 'absolute', left: '10px', top: '20px', color: 'white'}}>
          <Typist stdTypingDelay={10} avgTypingDelay={40} cursor={{show: false}}>
          <p> Hi hhhapz </p>
          <p> I have one very important thing I want to say to you! </p>
          <p> I really hope this won't ruin our friendship... </p>
          <p> I have been thinking about it for a while.... </p>
          <p> But I still think I need to tell you this! </p>
          <p> .................................... </p>
          <p> ------------------------------------ </p>
          <Typist.Delay ms={500}/>
          {new Array(10).fill(0).map((index)=>(
            <div key={index} style={{float: 'left'}}>
             <p>I have a pen</p>
             <p>I have a apple</p>
             <p>Uhhh!</p>
             <p>Apple pen</p>
              <p>I have a pen</p>
              <p>I have pineapple</p>
              <p>Uhhh!</p>
              <p>Pineapple pen</p>
              <span>Apple pen...</span>
              <br/><span >Pineapple pen...</span>
              <br/><span>Uh!</span><br/>
              <span>Pen Pineapple Apple Pen</span><br/>
              <span>Pen Pineapple Apple Pen</span><br/>
              <span >Pen Pineapple, Pen Pen Pen Apple Apple</span><br/>
              <span >Pen Pineapple, Pen Pen Pen Apple Pen</span><br/>
              <span>Pen Pineapple, Pen Pen Pen Apple Apple</span><br/>
              <span>Pen Pineapple, Pen Pen Pen Apple Apple</span><br/>
              <span>Pen Pineapple, Pen Pen Pen Apple Pen</span><br/>
              <span>Pen Pineapple, Pen Pen Pen Apple Apple</span><br/>
              <span>Pen Pineapple, Pen Pen Pen Apple Apple</span><br/>
              <span >Pen Pineapple, Pen Pen Pen Apple Pen</span><br/>
              <span>Pen Pineapple, Pen Pen Pen Apple Apple</span>
            </div>
          ))}
          
          </Typist>
        </div>
      </Banner>
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
