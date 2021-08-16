import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit'
import AccordionDetail from 'components/AccordionDetail'
import { useHistory } from 'react-router-dom'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import tabContentMap from '../constants'
import { QuestionStateType, QuestionMapType } from '../types'

interface SortableListContainerProps {
  tabIndex: number
  collapseItem: (isExpanded: boolean, index: number) => void
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void
  deleteDoc: (id: string) => Promise<void>
  questionList: QuestionMapType | null
  moveToTop: (arg0: number) => void
}
const SortableListContainer: React.FC<SortableListContainerProps> = ({
  collapseItem,
  questionList,
  onSortEnd,
  deleteDoc,
  tabIndex,
  moveToTop,
}) => {
  const history = useHistory()
  const SortableItem = SortableElement(({ value, sortIndex }: { value: QuestionStateType; sortIndex: number }) => {
    const { title, id, isExpanded, content } = value
    return (
      <Card>
        <CardHeader
          disableTypography
          action={
            <>
              <IconButton
                onClick={(): void => collapseItem(!isExpanded, sortIndex)}
                size="small"
                color="inherit"
                aria-label="Expand"
                component="span"
              >
                <ExpandMoreIcon />
              </IconButton>
              <IconButton
                onClick={(): void => moveToTop(sortIndex)}
                size="small"
                color="inherit"
                aria-label="Move to top"
                component="span"
              >
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton
                onClick={(): void => {
                  history.push(`/${tabContentMap[tabIndex].key}/${id}`)
                }}
                size="small"
                color="inherit"
                aria-label="Move to top"
                component="span"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(): void => {
                  deleteDoc(id)
                }}
                size="small"
                color="inherit"
                aria-label="Delete"
                component="span"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </>
          }
          title={title}
        />
        <Divider />
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <AccordionDetail {...{ content, isExpanded, sortIndex, collapseItem }} />
          </CardContent>
        </Collapse>
      </Card>
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
