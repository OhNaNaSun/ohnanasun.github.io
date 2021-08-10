import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import AccordionDetail from 'components/AccordionDetail'
import { useHistory } from 'react-router-dom'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { QuestionStateType, QuestionMapType } from '../types'
import tabContentMap from '../constants'
import useStyles from '../pages/QuestionStyle'

interface SortableListContainerProps {
  tabIndex: number
  collapseItem: (isExpanded: boolean, index: number) => void
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void
  deleteDoc: (id: string) => Promise<void>
  questionList: QuestionMapType | null
}
const SortableListContainer: React.FC<SortableListContainerProps> = ({
  collapseItem,
  questionList,
  onSortEnd,
  deleteDoc,
  tabIndex,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const SortableItem = SortableElement(({ value, sortIndex }: { value: QuestionStateType; sortIndex: number }) => {
    const { title, id, isExpanded, content } = value
    return (
      <Accordion
        expanded={isExpanded}
        key={sortIndex}
        onChange={(e, expanded): void => {
          collapseItem(expanded, sortIndex)
        }}
      >
        <AccordionSummary
          classes={{ content: classes.accordingTitle }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={`panel1bh-header-${sortIndex}`}
        >
          <Typography className={classes.heading}>{title}</Typography>
          <EditIcon
            className={classes.secondaryHeading}
            onClick={(): void => {
              history.push(`/${tabContentMap[tabIndex].key}/${id}`)
            }}
          />
          <DeleteOutlineIcon
            className={classes.secondaryHeading}
            onClick={(): void => {
              deleteDoc(id)
            }}
          />
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <AccordionDetail {...{ content, isExpanded, sortIndex, collapseItem }} />
        </AccordionDetails>
      </Accordion>
    )
  })
  const SortableList = SortableContainer(({ items }: { items: QuestionMapType }) => {
    return (
      <div>
        {(items || []).map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} sortIndex={index} value={value} />
        ))}
      </div>
    )
  })
  return <SortableList distance={2} items={questionList || []} onSortEnd={onSortEnd} />
}
export default SortableListContainer
