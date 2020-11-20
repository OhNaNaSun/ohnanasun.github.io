import { message } from 'antd'
import { useHistory } from 'react-router-dom'

const history = useHistory()
export const postMdContent = async (mdContent: string, path: string): Promise<void> => {
  try {
    const uploadFileResponse = await fetch(`${process.env.PUBLIC_URL}/api/files/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        name: path,
        mdContent,
      }),
    })
    const { statusText } = uploadFileResponse
    message.success(statusText)
    history.push(`/${path}`)
  } catch (error) {
    message.error(error.message)
  }
}
export default postMdContent
