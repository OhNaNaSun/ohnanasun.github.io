import React, { useEffect, useState } from 'react'
import { Row, message } from 'antd'
import MdEditor from 'components/MdEditor'

const QuestionPage: React.FC = () => {
  const [questionMdContent, setQuestionMdContent] = useState('')
  useEffect(() => {
    ;(async (): Promise<void> => {
      const tutorialReponse = await fetch(`${process.env.PUBLIC_URL}/api/question.md`)
      const tutorialText = await tutorialReponse.text()
      setQuestionMdContent(tutorialText)
    })()
  }, [])
  const postMdContent = async (content: string): Promise<void> => {
    try {
      const uploadFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          name: `question.md`,
          mdContent: content,
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
      <MdEditor postMdContent={postMdContent} mdContent={questionMdContent} readOnly={false} />
    </Row>
  )
}
export default QuestionPage
