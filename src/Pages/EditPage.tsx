import React from 'react'
import MarkdownEditor from 'components/MarkdownEditor'
import Box from '@material-ui/core/Box'

const EditPage: React.FC = () => {
  return (
    <Box mt={2}>
      <MarkdownEditor />
    </Box>
  )
}
export default EditPage
