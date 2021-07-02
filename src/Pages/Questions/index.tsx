import React, { useEffect, useState } from 'react'
import { List, Menu } from 'antd'
import styled from 'styled-components'

interface QuestionMapType {
  [key: string]: string[]
}

const StyledList = styled(List)`
  .ant-list-item {
    border-bottom: none;
    padding-bottom: 0;
    margin-top: 10px;
  }
`
const QuestionPage: React.FC = () => {
  const [questionMdContent, setQuestionMdContent] = useState<QuestionMapType | null>(null)
  const [currentTab, setCurrentTab] = useState<string>('javascript')
  useEffect(() => {
    ;(async (): Promise<void> => {
      const fileMapResponse = await fetch(`./api/questions`)
      const fileMap = await fileMapResponse.json()
      setQuestionMdContent(fileMap)
    })()
  }, [])
  console.log(questionMdContent)
  return (
    <div style={{ margin: '20px auto', width: '80%' }}>
      <Menu
        onClick={(e): void => {
          console.log(e.key)
          // setCurrentTab(e.key)
        }}
        selectedKeys={[currentTab]}
        mode="horizontal"
      >
        <Menu.Item key="javascript">Navigation One</Menu.Item>
        <Menu.Item key="html">Navigation One</Menu.Item>
      </Menu>
      <StyledList>
        {questionMdContent &&
          questionMdContent[currentTab].map((item: string, index: number) => (
            <List.Item key={index}>{item.replace('.md', '')}</List.Item>
          ))}
      </StyledList>
    </div>
  )
}
export default QuestionPage
