import React from 'react'
import { Link as UiLink } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ShowdownConverter from 'components/ShowdownConverter'

import useStyles from '../page/QuestionStyle'

interface AccordionDetailProps {
  content?: string
  isExpanded: boolean
  sortIndex: number
  collapseItem: (arg0: boolean, arg1: number) => void
}
const AccordionDetail: React.FC<AccordionDetailProps> = ({ content, isExpanded, sortIndex, collapseItem }) => {
  const classes = useStyles()
  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <div className="markdown-body">
        <span dangerouslySetInnerHTML={{ __html: ShowdownConverter.makeHtml(content || '') }} />
      </div>
      <div>
        <UiLink
          component="button"
          className={classes.button}
          color="secondary"
          onClick={(): void => {
            collapseItem(!isExpanded, sortIndex)
          }}
        >
          collapse
          <ArrowUpwardIcon fontSize="small" />
        </UiLink>
      </div>
    </div>
  )
}
export default AccordionDetail
