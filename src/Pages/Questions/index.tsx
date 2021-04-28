import React, { useEffect, useState } from 'react'
import { Row, message } from 'antd'
import MdEditor from 'components/MdEditor'
import { SaveOutlined } from '@ant-design/icons'

const QuestionPage: React.FC = () => {
  const [questionMdContent, setQuestionMdContent] = useState('')
  useEffect(() => {
    ;(async (): Promise<void> => {
      const tutorialReponse = await fetch(`${process.env.PUBLIC_URL}/api/question.md`)
      const tutorialText = await tutorialReponse.text()
      setQuestionMdContent(tutorialText)
    })()
  }, [])
  const postMdContent = async (): Promise<void> => {
    try {
      const uploadFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: `./statics/question.md`,
          mdContent: questionMdContent,
        }),
      })
      const { statusText } = uploadFileResponse
      message.success(statusText)
      window.location.reload()
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <Row style={{ margin: '20px auto', width: '80%' }}>
      <SaveOutlined
        style={{ fontSize: '1.5rem' }}
        onClick={(): void => {
          postMdContent()
        }}
      />
      <MdEditor mdContent={questionMdContent} changeMdContent={setQuestionMdContent} readOnly={false} />
    </Row>
  )
}
export default QuestionPage
